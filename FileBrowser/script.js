var shortTree = [
    {
      "title": "LittleBigPlanet PS Vita",
      "Game play resources":
        {
          "Installation":
            [
              { "file_name": "install.iso", "type": "iso image" },
              { "file_name": "archive_unbox.dat", "type": "dat file" }
            ],
          "Resource Dependency":
              [
                { "file_name": "profile.sav", "type": "sav file" },
                { "file_name": "snd0.AT3", "type": "AT3 file" }
              ]
        }
    },
    {
      "title": "Marvel Super Hero Edition",
      "Game play resources":
        {
          "Installation":
            [
              { "file_name": "install.iso", "type": "iso image" },
              { "file_name": "archive_unbox.dat", "type": "dat file" }
            ],
          "Resource Dependency":
              [
                { "file_name": "profile.sav", "type": "sav file" },
                { "file_name": "snd0.AT3", "type": "AT3 file" }
              ]
        }
    },
    {
      "title": "Splice: Tree of Life",
      "Game play resources":
        {
          "Installation":
            [
              { "file_name": "install.iso", "type": "iso image" },
              { "file_name": "archive_unbox.dat", "type": "dat file" }
            ],
          "Resource Dependency":
              [
                { "file_name": "profile.sav", "type": "sav file" },
                { "file_name": "snd0.AT3", "type": "AT3 file" }
              ]
        }
    }
]

var fileTree = [];
var domFileTree = document.getElementById("explorer-tree");

function fileHandler(shortTree) {

}

window.onload = function() {
    
    for (var x in shortTree) {
        if(shortTree[x]["title"]){
            var newFolder = document.createElement("span");
            newFolder.setAttribute("class", "folder");
            newFolder.setAttribute("name", x);
            var arrowIcon = document.createElement("img");
            arrowIcon.setAttribute("class", "arrow-icon");
            arrowIcon.setAttribute("src", "./assets/images/white-arrow.png");
            arrowIcon.setAttribute("alt", "+");
            var folderIcon = document.createElement("img");
            folderIcon.setAttribute("class", "folder-icon");
            folderIcon.setAttribute("src", "./assets/images/folder.png");
            folderIcon.setAttribute("alt", "F");
            newFolder.appendChild(arrowIcon);
            newFolder.appendChild(folderIcon);
            var name = document.createElement("p");
            name.innerHTML = shortTree[x]["title"];
            newFolder.appendChild(name);
            domFileTree.appendChild(newFolder);
            newFolder.addEventListener("click", expand);
            console.log(Object.keys(shortTree[x]).length)
        }
        else {
            var newFile = document.createElement("span");
            newFile.setAttribute("class", "file");
            newFile.setAttribute("name", x);
            var fileIcon = document.createElement("img");
            fileIcon.setAttribute("class", "file-icon");
            fileIcon.setAttribute("src", "./assets/images/file.png");
            fileIcon.setAttribute("alt", "f");
            newFile.appendChild(fileIcon);
            var name = document.createElement("p");
            name.innerHTML = shortTree[x]["file_name"];
            newFile.appendChild(name);
            domFileTree.appendChild(newFile);
        }
    }
}



//click functionality for Folders


function expand(e) {
    var arrow = null;
    if(e.srcElement.parentNode.className === "folder")
        arrow = e.srcElement.parentNode.firstElementChild;
    else if(e.srcElement.className === "folder")
        arrow = e.srcElement.firstElementChild;

    if(arrow.style.transform === "rotate(0deg)"){
        arrow.style.transform = "rotate(-90deg)";
        arrow.setAttribute("alt", "+");
    }
    else{
        arrow.style.transform = "rotate(0deg)";
        arrow.setAttribute("alt", "-");
    }
}
    