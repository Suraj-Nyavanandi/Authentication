import { Document } from 'mongoose';
export declare class PasswordReset extends Document {
    email: string;
    token: string;
    expiresAt: Date;
}
export declare const PasswordResetSchema: import("mongoose").Schema<PasswordReset, import("mongoose").Model<PasswordReset, any, any, any, Document<unknown, any, PasswordReset> & PasswordReset & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PasswordReset, Document<unknown, {}, import("mongoose").FlatRecord<PasswordReset>> & import("mongoose").FlatRecord<PasswordReset> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
