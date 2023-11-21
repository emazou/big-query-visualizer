export type ResponseType<T> = {
    data: T;
    status: number;
    success: boolean;
    message: string;

}

export type User = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export type UserLogin = {
    username: string;
    password: string;
}

export type DataLogin = {
    access: string;
    refresh: string;
    user: User;
}

export type UserRegister = {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
    created_at: Date;
}   
export type Comment = {
    id: number;
    username: string;
    text: string;
    created_at: Date;
    saved_query: number;
}

export type SavedQuery = {
    id: number;
    name: string;
    username: string;
    comment: string;
    comments: Comment[];
    end_year: number;
    start_year: number;
    indicator_code: string;
    country_code: string;
    created_at: Date;
}

export type Country = {
    country_code: string;
    short_name: string;
}

export type EducationData = {
    country_code: string;
    country_name: string;
    year: number;
    value: number;
    indicator_code: string;
    indicator_name: string;
}

export type QueryParamsEducationData ={
    country_code: string;
    indicator_code: string;
    start_year: number;
    end_year: number;
}

export type IndicatorSummary = {
    indicator_code: string;
    indicator_name: string;
}

export type Chart = "LineChart" | "BarChart" | "JointLineScatter"