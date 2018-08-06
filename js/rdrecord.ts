import {RDCondition} from "./rdcondition";
export class RDRecord {
    Entry: number;
    ID: number;
    Prefix: string;
    FirstName: string;
    LastName: string;
    Date: Date;
    Amount: number;
    Tax: number;
    Conditions: RDCondition;
}