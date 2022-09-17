function applyExtraSetup(sequelize) {
	const {
		UserRoles,
		Users,
		UserStatuses,
		Categories,
		Proposals,
		ProposalStatuses,
		Missions,
		MissionBudget,
		MissionCategories,
		MissionFundingType,
		MissionType,
		MissionApplicants,
		MissionFiles,
		Milestones,
		MilestoneStatuses,
		Evidences,
		Transactions,
		Disputes,
		UserSkills,
		UserFiles,
		UserFiles2,
		UserFiles3,
		BookmarkedUsers,
		BookmarkedMissions,
		UserEmployment,
	} = sequelize.models;

	UserRoles.hasMany(Users, { foreignKey: 'roleId', as: 'roles' });
	Users.belongsTo(UserRoles, { foreignKey: 'roleId', as: 'roles' });

	UserStatuses.hasMany(Users, { foreignKey: 'statusId', as: 'statuses' });
	Users.belongsTo(UserStatuses, { foreignKey: 'statusId', as: 'statuses' });

	MissionBudget.hasMany(Missions, { foreignKey: 'budgetId' });
	Missions.belongsTo(MissionBudget, { foreignKey: 'budgetId' });

	Users.hasMany(Missions, { foreignKey: 'userId' });
	Missions.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

	Users.hasMany(UserEmployment, { foreignKey: 'userId', as: 'employments' });
	UserEmployment.belongsTo(Users, { foreignKey: 'userId', as: 'employments' });

	Users.hasMany(UserFiles, { foreignKey: 'userId', as: 'files' });
	UserFiles.belongsTo(Users, { foreignKey: 'userId', as: 'files' });

	Users.hasMany(UserSkills, { foreignKey: 'userId', as: 'skills' });
	UserSkills.belongsTo(Users, { foreignKey: 'userId', as: 'skills' });

	Users.hasMany(UserFiles2, { foreignKey: 'userId', as: 'selfyFiles' });
	UserFiles2.belongsTo(Users, { foreignKey: 'userId', as: 'selfyFiles' });

	Users.hasMany(UserFiles3, { foreignKey: 'userId', as: 'licenseFiles' });
	UserFiles3.belongsTo(Users, { foreignKey: 'userId', as: 'licenseFiles' });

	Users.hasMany(BookmarkedUsers, {
		onDelete: 'cascade',
		foreignKey: 'userId',
		as: 'bookmarks',
	});
	BookmarkedUsers.belongsTo(Users, { foreignKey: 'userBookmarkId', as: 'user' });

	Users.hasMany(BookmarkedMissions, {
		onDelete: 'cascade',
		foreignKey: 'userId',
		as: 'missionBookmarks',
	});
	BookmarkedMissions.belongsTo(Missions, { foreignKey: 'missionId', as: 'mission' });

	Categories.belongsTo(Categories, {
		as: 'parent',
		foreignKey: 'parent_id',
		targetKey: 'id',
	});
	Categories.hasMany(Categories, {
		as: 'children',
		foreignKey: 'parent_id',
	});

	Missions.belongsToMany(Categories, {
		through: MissionCategories,
		onDelete: 'cascade',
		as: 'cats',
		foreignKey: 'missionId',
	});
	Categories.belongsToMany(Missions, {
		through: MissionCategories,
		as: 'mission',
		foreignKey: 'catId',
	});

	MissionFundingType.hasMany(Missions, {
		foreignKey: 'missionFundingTypeId',
		as: 'missionFundingType',
	});
	Missions.belongsTo(MissionFundingType, {
		foreignKey: 'missionFundingTypeId',
		as: 'missionFundingType',
	});

	MissionType.hasMany(Missions, { foreignKey: 'missionTypeId', as: 'missionType' });
	Missions.belongsTo(MissionType, { foreignKey: 'missionTypeId', as: 'missionType' });

	Missions.hasMany(MissionFiles, { foreignKey: 'missionId', as: 'missionFiles' });
	MissionFiles.belongsTo(Missions, { foreignKey: 'missionId', as: 'missionFiles' });

	Missions.belongsToMany(Users, {
		through: MissionApplicants,
		onDelete: 'cascade',
		as: 'missions',
		foreignKey: 'missionId',
	});
	Users.belongsToMany(Missions, {
		through: MissionApplicants,
		as: 'users',
		foreignKey: 'userId',
	});

	ProposalStatuses.hasMany(Proposals, { foreignKey: 'statusId' });
	Proposals.belongsTo(ProposalStatuses, { foreignKey: 'statusId', as: 'status' });

	MilestoneStatuses.hasMany(Milestones, { foreignKey: 'statusId' });
	Milestones.belongsTo(MilestoneStatuses, { foreignKey: 'statusId' });

	Proposals.hasMany(Milestones, { foreignKey: 'proposalsId', as: 'milestones' });
	Milestones.belongsTo(Proposals, { foreignKey: 'proposalsId' });

	Users.hasMany(Proposals, { foreignKey: 'userId' });
	Proposals.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

	Missions.hasMany(Proposals, { foreignKey: 'missionId' });
	Proposals.belongsTo(Missions, { foreignKey: 'missionId', as: 'mission' });

	Milestones.hasMany(Evidences, { foreignKey: 'milestoneId', as: 'evidences' });
	Evidences.belongsTo(Milestones, { foreignKey: 'milestoneId' });

	Milestones.hasMany(Transactions, { foreignKey: 'milestoneId' });
	Transactions.belongsTo(Milestones, { foreignKey: 'milestoneId' });

	Users.hasMany(Transactions, { foreignKey: 'usePaidId' });
	Transactions.belongsTo(Users, { foreignKey: 'usePaidId' });

	Users.hasMany(Transactions, { foreignKey: 'useReceivedId' });
	Transactions.belongsTo(Users, { foreignKey: 'useReceivedId' });

	Transactions.hasMany(Disputes, { foreignKey: 'transactionId' });
	Disputes.belongsTo(Transactions, { foreignKey: 'transactionId' });
}

module.exports = { applyExtraSetup };
