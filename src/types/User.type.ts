

export type UserCardProps = {
    avatar: string;
    createdAt: Date;
    hobby: string;
    id: number;
    location: string;
    name: string;
}

export type StateType = {
    data:   UserCardProps[];
    loading: boolean;
    error: null | Error;
};

export type Action = { type: 'LOADING' } | 
            { type: 'SUCCESS'; payload:  UserCardProps[] }   | 
            { type: 'ERROR'; payload: Error };

