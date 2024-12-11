import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const apiKey = process.env.WEATHER_APIKEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    if (!city) {
        return NextResponse.json({ error: "City name cannot be empty" }, { status: 400 });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        return NextResponse.json(response.data);
    } catch (error) {
        if (error.response) {
            // Request made and server responded with a status code out of the range of 2xx
            if (error.response.status === 404) {
                return NextResponse.json({ error: "City not found" }, { status: 404 });
            }
            return NextResponse.json({ error: `Server error: ${error.response.statusText}` }, { status: error.response.status });
        } else if (error.request) {
            // Request made but no response received
            return NextResponse.json({ error: "No response received from server" }, { status: 500 });
        } else {
            // Something happened in setting up the request
            return NextResponse.json({ error: `Request error: ${error.message}` }, { status: 500 });
        }
    }
}
