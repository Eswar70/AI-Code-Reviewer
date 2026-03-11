export interface ReviewResponse {
    bugs: string[];
    security_issues: string[];
    performance_issues: string[];
    suggestions: string[];
    refactored_code: string;
}

export interface HistoryItem extends ReviewResponse {
    id: string;
    code: string;
    language: string;
    created_at: string;
}
