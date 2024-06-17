interface IProblemDetail extends Error {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    message: string;
}

export class ProblemDetail implements IProblemDetail {
    name: string;
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;

    constructor(type: string, title: string, status: number, detail: string, instance: string) {
        this.type = type;
        this.title = title;
        this.name = title;
        this.status = status;
        this.detail = detail;
        this.instance = instance;
    }

    get message() {
        return this.detail;
    }
}