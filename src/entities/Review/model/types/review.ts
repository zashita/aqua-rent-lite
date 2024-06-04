export interface Review{
    id?: string;
    userId: string;
    userEmail: string;
    boatId: string;
    rating: number;
    comment?: string;
    answer?: string;
    updatedAt?: string;
}

export interface ReviewSchema{
    isLoading: boolean;
    reviewsList: Review[];
}