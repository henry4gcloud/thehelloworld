export class Model{
    id?: string|number;
    createdAt?: Date;
    latestUpdatedAt?: Date;
    deletedAt?: Date;
    constructor(obj?: object) {
        if (obj && Object.entries(obj).length){
            Object.entries(obj).forEach(([key, value]) => {
                this[key] = value;
            });
        }
    }
}
