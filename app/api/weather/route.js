import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const apiKey = process.env.WEATHER_APIKEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
    }
}
