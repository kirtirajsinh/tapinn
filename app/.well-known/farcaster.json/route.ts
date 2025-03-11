export async function GET() {

    const appUrl = process.env.NEXT_PUBLIC_URL;
    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
    const logoUrl = process.env.NEXT_PUBLIC_LOGO;

    const config = {
        "accountAssociation": {
            "header": "eyJmaWQiOjY4NjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhBNTkzMUE3MjZDRUNjYTA1N0EzRkY0M0E4NDg4MzQ2NjI2MDQ3OEI0In0",
            "payload": "eyJkb21haW4iOiJ0YXBpbm4ueHl6In0",
            "signature": "MHgwOWE4M2EzMTdiZTQxYzZlOGE3NzQ3NmE4NGQyMzUxZjAwN2Y5NmE1Zjk0YTFiOWNkYTVlOTVhOGY4YTE4Y2QzNjg3NzMyNWRmZjdjMDAwMGFhMWI1NDhkNDNlZTVmYjIzMWUyZDVmNDFlODYyMzdhOWYxZWY2NTI3MjFmMmIzMjFj"
        },
        frame: {
            version: "1",
            name: "TapInn",
            iconUrl: `${logoUrl}`,
            homeUrl: `${appUrl}`,
            imageUrl: `${imageUrl}`,
            buttonTitle: "Start TapInn",
            splashImageUrl: `${logoUrl}`,
            splashBackgroundColor: "#FFFFFF",
            webhookUrl: `${appUrl}/api/webhook`
        }
    }

    return Response.json(config);

}