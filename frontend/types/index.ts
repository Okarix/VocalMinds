export interface FeedbackContent {
	rating: string;
	feedback: string;
	recommendations: string;
	exercises: string;
	first_song?: string;
	second_song?: string;
	third_song?: string;
	fourth_song?: string;
	fifth_song?: string;
}

export interface Feedback {
	pitch: FeedbackContent;
	timbre: FeedbackContent;
	dynamics: FeedbackContent;
	articulation: FeedbackContent;
	rhythm: FeedbackContent;
	breath_control: FeedbackContent;
	vibrato: FeedbackContent;
	overall: FeedbackContent;
	music?: {
		[key: string]: string;
	};
}
