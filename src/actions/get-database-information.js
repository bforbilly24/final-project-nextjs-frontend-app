"use server";

async function getDatabaseInformation() {
	try {
		const options = {
			method: "GET",
			headers: {
				Authorization: `${process.env.PS_API_SERVICE_TOKEN_ID}:${process.env.PS_API_SERVICE_TOKEN}`,
				accept: "application/json",
			},
		};

		const res = await fetch(process.env.PS_API_URL, options);
		const data = await res.json();

		return data;
	} catch (error) {
		const errorData = { ready: false };

		return errorData;
	}
}

export { getDatabaseInformation };
