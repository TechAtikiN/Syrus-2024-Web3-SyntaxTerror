type TCase = {
  plaintiff: {
    name: string;
    email: string;
    contact: string;
    address: string;
    plaint: any;
  };
  defendant: {
    name: string;
    email: string;
    contact: string;
    address: string;
    summon: any;
    claim: any;
  };
  additionalDocuments: any;
  caseDescription: string;
  status: string;
  caseId: string;
  caseCreatedAt: string;
}

type CaseDetails = {
  additionalDocuments: any;
  caseDescription: string;
  caseId: string;
  caseCreatedAt?: string;
  plaintiff: {
    name: string;
    email: string;
    contact: string;
    address: string;
    plaint: any;
  };
  defendant: {
    name: string;
    email: string;
    contact: string;
    address: string;
    summon: any;
    claim: any;
  };
  status: string;
}