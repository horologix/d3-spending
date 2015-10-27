var LIM = 70;

var margin = {top: 300, right: 0, bottom: 10, left: 300},
    width = 800,
    height = 800;

var x = d3.scale.ordinal().rangeBands([0, width]),
    z = d3.scale.linear().clamp(true),
    c = d3.scale.category10().domain(d3.range(10));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(data) {
    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height);

    var first = "vendor";
    var second = "account";
    render("vendor", "account");

    d3.select("#rkey").on("change", function() {
        first = this.value;
        render(first, second);
    });
    d3.select("#ckey").on("change", function() {
        second = this.value;
        render(first, second);
    });

    function render(kr, kc) {
        var rr = count(kr);
        var cc = count(kc);
        var res = make(rr, cc, kr, kc);
        var matrix = res[0];
        var max = res[1];
        
        x.domain(d3.range(LIM));
        z.domain([0, Math.ceil(max)]);
        
        svg.selectAll(".row").remove();
        var row = svg.selectAll(".row")
            .data(matrix)
        .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
            .each(row);

        function row(row) {
            var cell = d3.select(this).selectAll(".cell")
                .data(row.filter(function(d) { return d.v; }))
            .enter().append("rect")
                .attr("class", "cell")
                .attr("x", function(d) { return x(d.x); })
                .attr("width", x.rangeBand())
                .attr("height", x.rangeBand())
                .style("fill-opacity", function(d) { return .1+.8*z(d.v); })
                .style("fill", function() {return "#23aaf3";});
        }
        
        svg.selectAll(".rr").remove();
        var rtext = svg.selectAll(".rr")
            .data(rr)
        .enter().append("g")
            .attr("class", "rr")
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; });

        rtext.append("line")
            .attr("x2", width);

        rtext.append("text")
            .attr("x", -6)
            .attr("y", x.rangeBand() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text(function(d, i) { return d.key; });

        svg.selectAll(".column").remove();
        var ctext = svg.selectAll(".column")
            .data(cc)
        .enter().append("g")
            .attr("class", "column")
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

        ctext.append("line")
            .attr("x1", -width);

        ctext.append("text")
            .attr("x", 6)
            .attr("y", x.rangeBand() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .text(function(d, i) { return d.key; });
    };

    function make(row, col, kr, kc) {
        var m = [];
        for(var i = 0; i < LIM; i++) {
            var mm = [];
            m.push(mm);
            for(var j = 0; j < LIM; j++) {
                mm.push({x:j, y:i, v:0});
            }
        }

        var rkeys = {};
        var ckeys = {};
        for(var i = 0; i < row.length; i++) {
            rkeys[row[i].key] = i;
            ckeys[col[i].key] = i;
        }

        var max = 0;
        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            if(!d.price) continue;
            var v = +d.price.substr(1);
            if(!v) continue;

            var flag = d[kr] in rkeys && d[kc] in ckeys;
            var ri = d[kr] in rkeys ? rkeys[d[kr]] : rkeys["OTHER"];
            var ci = d[kc] in ckeys ? ckeys[d[kc]] : ckeys["OTHER"];
            m[ri][ci].v += v;
            if(flag)
            max = Math.max(max, m[ri][ci].v);
        }
        return [m, max];
    }

    function count(key) {
        var m = {};
        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            if(!d.price) continue;
            var v = +d.price.substr(1);
            if(!v) continue;

            var k = d[key];
            m[k] = m[k] || 0;
            m[k] += v;
        }
        var arr = [];
        for(var k in m) {
            arr.push({key:k, value:m[k]});
        }
        arr.sort(function(a,b) {return b.value-a.value;});
        while(arr.length > LIM-1) arr.pop();
        arr.push({key:"OTHER", value:0});
        while(arr.length <= LIM-1) arr.push({key:"", value:0});
        return arr;
    }
});
