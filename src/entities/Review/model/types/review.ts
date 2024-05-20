export interface Review{
    id?: number;
    userId: string;
    userEmail: string;
    boatId: string;
    rating: number;
    comment?: string;
}

export interface ReviewSchema{
    isLoading: boolean;
    reviewsList: Review[];
}