"use server";

const { prisma } = require("@/libs/prisma");

async function deleteAnnouncement(arrayId) {
	try {
		await prisma.announcementOnProvider.deleteMany({
			where: {
				announcementId: {
					in: arrayId,
				},
			},
		});
		await prisma.announcement.deleteMany({
			where: {
				id: {
					in: arrayId,
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export { deleteAnnouncement };
