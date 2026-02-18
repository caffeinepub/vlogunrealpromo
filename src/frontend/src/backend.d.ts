import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ReferenceId = bigint;
export interface PromoVideoRequest {
    url: string;
    title: string;
    referenceId: ReferenceId;
    description: string;
}
export interface backendInterface {
    createPromoVideoRequest(referenceId: ReferenceId, title: string, description: string, url: string): Promise<void>;
    getAllPromoVideoRequests(): Promise<Array<PromoVideoRequest>>;
    getPromoVideoRequest(referenceId: ReferenceId): Promise<PromoVideoRequest>;
}
