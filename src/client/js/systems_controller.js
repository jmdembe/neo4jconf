(function (){

    angular.module('neo4j-demo').controller('SystemsController', function(){
        var w = 1000;
        var h = 600;
        var linkDistance=150;
    
        var colors = d3.scale.category10();
    
        var dataset = {
    
        nodes: [
        {name: "EAIR", "label": "System", "id": 0},
        {name: "Apache Software Foundation [Product]"},
        {name: "DHS Enterprise Architecture Information Repository [Data Asset]"},
        {name: "Enterprise Architecture Online Repository [Data Asset"},
        {name: "Information Technology Acquisition Review [Data Asset]"},
        {name: "Develop and Maintain Enterprise Architecture [Activity]"},
        {name: "Enterprise Architecture [Investment]"},
        {name: "Enterprise Architecture Management Tool [Child System]"},
        {name: "The PHP Group [Product]"},
        {name: "Oracle Database 12.1 [Product]"},
        {name: "Oracle Application Express [Product]"},
        {name: "Open BSD Open SSH 5.3 [Product]"},
        {name: "ElasticSearch [Product]"}
        ],
        edges: [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 0, target: 3},
        {source: 0, target: 4},
        {source: 0, target: 5},
        {source: 0, target: 5},
        {source: 0, target: 5},
        {source: 0, target: 4},
        {source: 0, target: 8},
        {source: 0, target: 9},
        {source: 0, target: 7},
        {source: 0, target: 8},
        {source: 0, target: 9}
        ]
        };
    
     
        var svg = d3.select("body").append("svg").attr({"width":w,"height":h});
    
        var force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([w,h])
            .linkDistance([linkDistance])
            .charge([-500])
            .theta(0.1)
            .gravity(0.05)
            .start();

        var edges = svg.selectAll("line")
          .data(dataset.edges)
          .enter()
          .append("line")
          .attr("id",function(d,i) {return 'edge'+i})
          .attr('marker-end','url(#arrowhead)')
          .style("stroke","#ccc")
          .style("pointer-events", "none");
        
        var nodes = svg.selectAll("circle")
          .data(dataset.nodes)
          .enter()
          .append("circle")
          .attr({"r":15})
          .style("fill",function(d,i){return colors(i);})
          .call(force.drag)
    
    
        var nodelabels = svg.selectAll(".nodelabel") 
           .data(dataset.nodes)
           .enter()
           .append("text")
           .attr({"x":function(d){return d.x;},
                  "y":function(d){return d.y;},
                  "class":"nodelabel",
                  "stroke":"black"})
           .text(function(d){return d.name;});
    
        var edgepaths = svg.selectAll(".edgepath")
            .data(dataset.edges)
            .enter()
            .append('path')
            .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
                   'class':'edgepath',
                   'fill-opacity':0,
                   'stroke-opacity':0,
                   'fill':'blue',
                   'stroke':'red',
                   'id':function(d,i) {return 'edgepath'+i}})
            .style("pointer-events", "none");
    
        var edgelabels = svg.selectAll(".edgelabel")
            .data(dataset.edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr({'class':'edgelabel',
                   'id':function(d,i){return 'edgelabel'+i},
                   'dx':80,
                   'dy':0,
                   'font-size':10,
                   'fill':'#aaa'});
    
        edgelabels.append('textPath')
            .attr('xlink:href',function(d,i) {return '#edgepath'+i})
            .style("pointer-events", "none")
            .text(function(d,i){return 'label '+i});
    
    
        svg.append('defs').append('marker')
            .attr({'id':'arrowhead',
                   'viewBox':'-0 -5 10 10',
                   'refX':25,
                   'refY':0,
                   //'markerUnits':'strokeWidth',
                   'orient':'auto',
                   'markerWidth':10,
                   'markerHeight':10,
                   'xoverflow':'visible'})
            .append('svg:path')
                .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
                .attr('fill', '#ccc')
                .attr('stroke','#ccc');
         
    
        force.on("tick", function(){
    
            edges.attr({"x1": function(d){return d.source.x;},
                        "y1": function(d){return d.source.y;},
                        "x2": function(d){return d.target.x;},
                        "y2": function(d){return d.target.y;}
            });
    
            nodes.attr({"cx":function(d){return d.x;},
                        "cy":function(d){return d.y;}
            });
    
            nodelabels.attr("x", function(d) { return d.x; }) 
                      .attr("y", function(d) { return d.y; });
    
            edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                               //console.log(d)
                                               return path});       
    
            edgelabels.attr('transform',function(d,i){
                if (d.target.x<d.source.x){
                    bbox = this.getBBox();
                    rx = bbox.x+bbox.width/2;
                    ry = bbox.y+bbox.height/2;
                    return 'rotate(180 '+rx+' '+ry+')';
                    }
                else {
                    return 'rotate(0)';
                    }
            });
        });

    });

})();