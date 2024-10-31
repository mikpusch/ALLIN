
  var NumberOfStructures; // = 9; //Number(document.getElementById('NSEQ').innerHTML);
  var currentModel; // index of current model
  var viewer;
  var FirstPick=false;

  function increaseFontSize(){
	  let tables = document.getElementsByTagName('table');
	  let td = tables[0];
	  alert(td.style.fontSize);
	  td.style.fontSize = '14px';
	  alert(td.style.fontSize);
  }

  function setTextModel(text){
	  document.getElementById("TextModel").innerHTML='Current pdb: ' + text;
  }


  function ResidueIsResolved(index){
	  if (viewer.models.length<1){
		  return false;
	  }
	  if (viewer.models[0].atoms.length<1){
		  return false;
	  }
	  for (let i=0; i<viewer.models[0].atoms.length; i++){
		  if ((viewer.models[0].atoms[i].resi == index) && (viewer.models[0].atoms[i].chain == "A")){
			  return true;
		  }
	  }
	  return false;
  }
  function callSelectFocus(index, residue){
	  document.getElementById('NSEQ').innerHTML =' ';
	  if (index != currentModel){
		CreateViewer(index);
		return;
	  }
	  let res1=residue; //-1;
	  if (res1<1)
	  {
		  res1=1;
	  }
	  if (!ResidueIsResolved(res1)){
		  alert("residue " + res1 + " is not resolved in chain A of " + NameArray[index]);
		  return;
	  }
	  let rangeString = res1.toString(); // + '-' + res2.toString();
	  
	  let resString = residue.toString();

       viewer.setStyle({resi:[rangeString]},{stick:{color:"pink",thickness:1.0}, cartoon:{color:"green",thickness:1.0} });
//	   viewer.setStyle({hetflag: true},{stick:{colorscheme:"greenCarbon"}});
//
	   CheckHetatoms();

	   viewer.addResLabels({resi:[resString], chain:'A'}, {font: 'Arial', fontColor:'white',fontSize:12, showBackground:true});
	   viewer.render();
	   let region = {resi:[rangeString], chain:'A'};
//	   viewer.zoomTo({resi:[rangeString], chain:'A'}, 1000);
	   viewer.center(region, 400);
	   if (FirstPick){
		   viewer.zoom(3, 400);
	   }
	   else{
	   }
	   FirstPick = false;
  }


	function ZoomOut(){
		viewer.zoomTo();
	}

   function CreateViewer(i){
      FirstPick = true;
	  currentModel = i;

	  let elementstring = '#container-0';

  	  let element = $(elementstring);

	  let config = { backgroundColor: 'gray' };
	  viewer = $3Dmol.createViewer( element, config );


	 let pdb = PDBArray[i]//etPdbUri(i);


	 setTextModel(NameArray[i]);

		 viewer.addModel( pdb, "pdb" );                       /* load data */
		 viewer.setStyle({}, {cartoon: {color: 'spectrum'}});  /* style all atoms */
		 CheckHetatoms();
//   	     viewer.setStyle({hetflag: true},{stick:{colorscheme:"blackCarbon"}});

		 viewer.zoomTo();                                      /* set camera */
		 viewer.render();                                      /* render scene */
		 //viewer.zoom(1.2, 1000);                               /* slight zoom */

	 }
	   

window.onload = function(e) {
     //window.alert(document.getElementById('NSEQ').innerHTML);
	 NumberOfStructures = document.getElementById('NSEQ').innerHTML;
	 CreateViewer(0);
	 document.getElementById("showhetatoms").addEventListener("click", CheckHetatomsBox);
}

function CheckHetatomsBox(){
	CheckHetatoms();
	viewer.render();
}
	

function CheckHetatoms(){
       let ShowHetatoms = document.getElementById('showhetatoms').checked == 1;
	   if (ShowHetatoms){	
			viewer.setStyle({hetflag: true},{sphere:{colorscheme:"yellowCarbon"}});
			viewer.setStyle({resn: 'CL'},{sphere:{color:"white"}});
			}
	   else{
			viewer.setStyle({hetflag: true},{hidden: true});
	   }
}




