import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PromoVideo {
    url: string;
    title: string;
    thumbnailUrl: string;
    referenceId: ReferenceId;
    description: string;
}
export type ReferenceId = bigint;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPortfolioItem(referenceId: ReferenceId, title: string, description: string, url: string, thumbnailUrl: string): Promise<void>;
    deletePortfolioItem(referenceId: ReferenceId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolio(): Promise<Array<PromoVideo>>;
    getPortfolioItem(referenceId: ReferenceId): Promise<PromoVideo | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updatePortfolioItem(referenceId: ReferenceId, title: string, description: string, url: string, thumbnailUrl: string): Promise<void>;
}
