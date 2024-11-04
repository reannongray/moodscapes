export class SpotifyService {
    constructor() {
        this.clientId = process.env.SPOTIFY_CLIENT_ID;
        this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        this.baseUrl = 'https://api.spotify.com/v1';
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    async initialize() {
        await this.getAccessToken();
    }

    async getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    }

    async getRecommendations(mood) {
        if (!this.accessToken || Date.now() >= this.tokenExpiry) {
            await this.getAccessToken();
        }

        const moodParams = this.getMoodParameters(mood);
        const queryParams = new URLSearchParams(moodParams).toString();

        const response = await fetch(`${this.baseUrl}/recommendations?${queryParams}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        return await response.json();
    }

    getMoodParameters(mood) {
        const moodMappings = {
            energetic: {
                min_energy: 0.8,
                min_tempo: 120,
                target_valence: 0.8
            },
            relaxed: {
                max_energy: 0.4,
                max_tempo: 100,
                target_valence: 0.5
            },
            focused: {
                target_instrumentalness: 0.8,
                max_speechiness: 0.3,
                target_energy: 0.5
            },
            happy: {
                min_valence: 0.7,
                target_energy: 0.7,
                target_danceability: 0.7
            },
            melancholic: {
                max_valence: 0.4,
                target_energy: 0.4,
                target_mode: 0
            }
        };

        return moodMappings[mood] || moodMappings.relaxed;
    }
}

export default SpotifyService;
