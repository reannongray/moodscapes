export class AmbientService {
    constructor() {
        this.clientId = process.env.FREESOUND_CLIENT_ID;
        this.clientSecret = process.env.FREESOUND_CLIENT_SECRET;
        this.baseUrl = 'https://freesound.org/apiv2';
        this.accessToken = null;
    }

    async initialize() {
        await this.getAccessToken();
    }

    async getAccessToken() {
        const response = await fetch(`${this.baseUrl}/oauth2/access_token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'client_id': this.clientId,
                'client_secret': this.clientSecret,
                'grant_type': 'client_credentials'
            })
        });

        const data = await response.json();
        this.accessToken = data.access_token;
    }

    async getSoundsByMood(mood) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }

        const moodTags = this.getMoodTags(mood);
        const queryParams = new URLSearchParams({
            query: moodTags.join(' '),
            fields: 'id,name,url,previews',
            filter: 'duration:[1 TO 180]',
            sort: 'rating_desc',
            page_size: 15
        }).toString();

        const response = await fetch(`${this.baseUrl}/search/text/?${queryParams}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        return await response.json();
    }

    getMoodTags(mood) {
        const moodMappings = {
            energetic: ['upbeat', 'energetic', 'dynamic', 'bright'],
            relaxed: ['ambient', 'calm', 'peaceful', 'nature'],
            focused: ['minimal', 'concentration', 'study', 'workspace'],
            happy: ['positive', 'cheerful', 'sunny', 'playful'],
            melancholic: ['atmospheric', 'melancholic', 'rain', 'gentle']
        };

        return moodMappings[mood] || moodMappings.relaxed;
    }

    async getRandomAmbientSound(tags) {
        const sounds = await this.getSoundsByMood(tags);
        return sounds.results[Math.floor(Math.random() * sounds.results.length)];
    }
}

export default AmbientService;
