export type recordType = {
	initialSheetSettings: initialSheetSettingsType;
	dailyRecord: Array<dailyRecordType>;
	isAsyncStorageLoaded: boolean;
};

export interface initialSheetSettingsType {
	numOfPillsPerSheet: number;
	beginSheetIndex: number;
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
}
