interface JSTree {
	close_node( nodeID:string, animationDuration?:boolean | number ):JSTree;
	create_node( parent?:string | null, node?:any, position?:number | string, callback?:( arguments:any ) => any, isLoaded?:boolean ):string;
	delete_node( nodeID:string | Element ):JSTree;
	get_children_dom( nodeID:string ):JQuery;
	is_open( nodeID:string ):JSTree;
	open_node( nodeID:string, callback?:( arguments:any ) => any, animationDuration?:boolean | number ):JSTree;
	set_icon( nodeID:string, icon:string ):JSTree;
	settings:any;
}

interface JQuery {
	// TODO: Document available actions
	jstree( action:string, arguments:any ):JSTree;
	jstree( newInstance:boolean ):JSTree;
	// TODO: Document instantiation options
	jstree( options:any ):JSTree;
	jstree():JSTree;
}