const fileService = require('./file.service');
const { Milestones } = require('../database').models;

class MilestoneService {
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

	async getAllProperties() {}

	async add(data, proposalId) {
		if (!Array.isArray(data)) {
			data = [data];
		}
		for (let milestone of data) {
			milestone.proposalsId = proposalId;
			milestone.statusId = 1;
			delete milestone.id;
		}
		await Milestones.bulkCreate(data);
	}

	async update() {}

	async getOne() {}

	async getAll() {}

	async delete() {}
}

module.exports = new MilestoneService();
