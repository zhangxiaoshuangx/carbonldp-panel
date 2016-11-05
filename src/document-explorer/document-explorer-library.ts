export class DocumentExplorerLibrary {

	public static getSanitizedSlug( slug:string ):string {
		if( ! slug ) return slug;
		return slug.toLowerCase().replace( / - | -|- /g, "-" ).replace( /[^-\w ]+/g, "" ).replace( / +/g, "-" );
	}


	public static getAppendedSlashSlug( slug:string ):string {
		if( ! slug ) return slug;
		if( ! slug.endsWith( "/" ) && slug.trim() !== "" ) slug += "/";
		return slug;
	}
}

export default DocumentExplorerLibrary;