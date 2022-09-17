const { Op, fn, col, where } = require('sequelize');
const ApiError = require('../exceptions/ApiError');
const fileService = require('./file.service');
const milestoneService = require('./milestone.service');
const { log } = require('winston');
const { Proposals, ProposalStatuses, Users, Missions, UserSkills, Milestones, Evidences } =
	require('../database').models;

class ProposalService {
	async uploadMissionFiles(mission, files, filePath) {
		for (let key of Object.keys(files)) {
			const filesArray = [];

			if (!Array.isArray(files[key])) {
				files[key] = [files[key]];
			}

			if (files[key].length > 0) {
				files[key].forEach((file) => {
					filesArray.push({
						name: mission.userLink + '/' + mission.activationLink + '/' + file.name,
						missionId: mission.id,
					});
					fileService.saveFile(
						file,
						filePath + '/' + mission.userLink + '/' + mission.activationLink,
						file.name
					);
				});
			}

			// switch (key) {
			// 	case 'uploaded_missionFiles':
			// 		await MissionFiles.bulkCreate(filesArray);
			// 		break;
			// }
		}
	}

	async deleteFiles(data, filePath) {
		const deletedObj = JSON.parse(data);
		for (let key of Object.keys(deletedObj)) {
			let files = [];
			// switch (key) {
			// 	case 'missionFiles':
			// 		files = await MissionFiles.findAll({
			// 			where: { id: deletedObj[key] },
			// 		});
			// 		await MissionFiles.destroy({ where: { id: files.map((i) => i.id) } });
			// 		break;
			// }
			files.forEach((file) => {
				fileService.deleteFile(filePath, file.name);
			});
		}
	}

	async getAllProperties() {
		const statuses = await ProposalStatuses.findAll();
		return { statuses };
	}

	async add(data, sender) {
		const objToCreateProposal = {};
		Object.keys(data).forEach((key) => {
			if (key !== 'milestones') {
				data[key] !== 'null'
					? (objToCreateProposal[key] = data[key])
					: (objToCreateProposal[key] = null);
			}
		});
		objToCreateProposal.userId = sender.id;
		objToCreateProposal.statusId = 1;

		const newProposal = await Proposals.create(objToCreateProposal);

		if (data.milestones.length > 0) {
			await milestoneService.add(data.milestones, newProposal.id);
		}

		return newProposal;
	}

	async update(data) {
		const { id } = data;
		const proposal = await Proposals.findByPk(id);
		if (!proposal) {
			throw ApiError.badRequest(`Proposal was not find`);
		}

		for (let key of Object.keys(data)) {
			proposal[key] = data[key] !== 'null' ? data[key] : null;
		}

		await proposal.save();

		return proposal;
	}

	async getOne(id) {
		const proposal = await Proposals.findOne({
			where: { id },
			include: [
				{
					model: Users,
					as: 'user',
					required: false,
					attributes: [
						'id',
						'photo',
						'firstName',
						'lastName',
						'email',
						'location',
						'slug',
						'rating',
						'hourlyRate',
					],
					include: [{ model: UserSkills, as: 'skills', separate: true }],
				},
				{
					model: Milestones,
					as: 'milestones',
					include: [{ model: Evidences, as: 'evidences' }],
					separate: true,
				},
				{ model: ProposalStatuses, as: 'status' },
				{
					model: Missions,
					as: 'mission',
					attributes: ['userId'],
					include: [
						{
							model: Users,
							as: 'user',
							required: false,
							attributes: [
								'id',
								'photo',
								'firstName',
								'lastName',
								'email',
								'location',
								'slug',
								'rating',
								'hourlyRate',
							],
						},
					],
				},
			],
		});

		if (!proposal) {
			throw ApiError.badRequest('Mission not found');
		}
		return proposal;
	}

	async getAll(params, user) {
		const { userId, missionId, sort, statusId, limit = 10, page = 1 } = params;
		let offset = +page * +limit - +limit;
		const whereProposals = {};
		let mission;
		let orderVal;
		let includeModels = [
			{
				model: Users,
				as: 'user',
				required: false,
				attributes: [
					'id',
					'photo',
					'firstName',
					'lastName',
					'email',
					'location',
					'slug',
					'rating',
					'hourlyRate',
				],
				include: [{ model: UserSkills, as: 'skills', separate: true }],
			},
			{ model: ProposalStatuses, as: 'status' },
		];

		switch (user.role) {
			case 'source':
				whereProposals['userId'] = user.id;
				includeModels.push({
					model: Missions,
					as: 'mission',
					include: [
						{
							model: Users,
							as: 'user',
							required: false,
							attributes: [
								'id',
								'photo',
								'firstName',
								'lastName',
								'email',
								'location',
								'slug',
								'rating',
								'hourlyRate',
							],
						},
					],
				});
				break;
			case 'user':
				mission = await Missions.findOne({
					where: { id: missionId },
					attributes: ['userId'],
				});
				if (user.id === mission.userId) {
					whereProposals['missionId'] = missionId;
					whereProposals['statusId'] = { [Op.not]: 5 };
				} else {
					return { rows: [], count: 0 };
				}
				break;
			case 'admin':
				if (userId) whereProposals['userId'] = userId;
				if (missionId) whereProposals['missionId'] = missionId;
				break;
			default:
				return { rows: [], count: 0 };
		}

		switch (sort) {
			case 'newest':
				orderVal = [['createdAt', 'DESC']];
				break;
			case 'oldest':
				orderVal = [['createdAt', 'ASC']];
				break;
			default:
				orderVal = [];
		}

		if (statusId) {
			whereProposals['statusId'] = statusId;
		}

		const { rows, count } = await Proposals.findAndCountAll({
			where: whereProposals,
			include: includeModels,
			distinct: true,
			limit: +limit,
			offset: +offset,
			order: orderVal,
		});
		return { rows, count };
	}

	async delete() {}
}

module.exports = new ProposalService();
