import { headers } from "next/headers";
import { NextResponse } from "next/server";

function authorizationToken(request) {
	return new Promise((resolve, reject) => {
		const session = getServerSession(authOptions);

		const headersList = headers();

		const authorization = headersList.get("authorization");

		if (!authorization)
			return NextResponse.json(
				{
					status: 403,
					message: "Forbidden",
					data: null,
				},
				{ status: 403 },
			);

		const authSplit = authorization.split(" ");

		const [authType, authToken] = [authSplit[0], authSplit[1]];

		if (authType != "Bearer")
			return NextResponse.json(
				{
					status: 403,
					message: "Forsbidden",
					data: null,
				},
				{ status: 403 },
			);

		return jwt.verify(authToken, "PINC", function (error, decoded) {
			if (error)
				return NextResponse.json(
					{
						status: 403,
						message: "Forsbidden",
						data: null,
					},
					{ status: 403 },
				);
		});
	});
}

export { authorizationToken };
