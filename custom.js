$(function() {
    var current_active_content = null;
    var current_active_subcontent = null;
    var problem = null;
    var slug = null;
    var stage = null;
    
    function get_detail_contest() {
        $.ajax({
            url: "json/contest/" + slug + "_" + stage + ".json",
            async: false,
            success: function (d) {
                $(".content-sub").html(`
                <center><h3>${d["nama"]} (${d["tanggal"]})</h3></center>
                <center><h3>Team</h3></center>
                <div class="row justify-content-center team-list"></div>
                `);
                
                for (var i of d["team"]) {
                    var anggota = "";
                    for (var j of i["anggota"]) {
                        anggota += `
                        <li class="list-group-item border-0 pb-1 pt-1">${j}</li>
                        `;
                    }
                    $(".team-list").append(`
                    <div class="card m-3 border-0 shadow" style="width: 18rem;">
                        <img class="card-img-top" src="assets/img/team.svg" alt="Card image cap">
                        <div class="card-body text-center">
                            <h4 class="card-title">${i["nama"]}</h4>
                        </div>
                        
                        <ul class="list-group list-group-flush text-center pb-4">
                            <li class="list-group-item border-0">
                                <div class="row">
                                    <div class="col">
                                        <p><b>Rank</b></p>
                                        <p>${i["rank"]}</p>
                                    </div>
                                    <div class="col">
                                        <p><b>Solve</b></p>
                                        <p>${i["solve"]}</p>
                                    </div>
                                    <div class="col">
                                        <p><b>Penalty</b></p>
                                        <p>${i["penalty"]}</p>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item border-0"><b>Anggota</b></li>
                            ${anggota}
                        </ul>
                    </div>
                    `);
                }
            },
            error: function(d) {
                alert("data not found");
            }
        });
    }
    
    function get_problem() {
        $.ajax({
            url: "json/contest/" + slug + "_" + stage + "_" + problem + ".json",
            async: false,
            success: function (d) {
                var solutions = "";
                for (var i of d["solution"]) {
                    solutions += `
                    <a class="dropdown-item" id="solution" href="#" sol="${i}">Solution : ${i}</a>
                    `;
                }
                
                $(".content-sub").html(`
                <!-- <h3>Tags : ${d["tag"].join(", ")}</h3> -->
                <center>
                    <div class="form-group">
                        <div class="btn-group" role="group">
                            <button type="button" id="problem" class="btn btn-secondary active">Problem</button>

                            <div class="btn-group" role="group">
                                <button id="btnSolution" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Solution</button>
                                <div class="dropdown-menu" aria-labelledby="btnSolution">
                                    ${solutions}
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
                <div class="content-sub-sub">
                    <div class="embed-responsive embed-responsive-1by1" style="overflow: visible">
                        <object class="embed-responsive-item" data="problem/${slug}_${stage}_${problem}.pdf" type="application/pdf"> 
                            <p>It appears you don't have a PDF plugin for this browser.No biggie... you can <a href="problem/${slug}_${stage}_${problem}.pdf">click here todownload the PDF file.</a></p>
                        </object>
                    </div>
                </div>
                `);
            },
            error: function(d) {
                alert("data not found");
            }
        })
    }
    
    function get_solution(author) {
        var file = "solution/" + slug + "_" + stage + "_" + author + "_" + problem;
        $(".content-sub-sub").html(`
        <div class="embed-responsive embed-responsive-1by1" style="overflow: visible">
            <div class="embed-responsive-item">
                <pre><code></code></pre>
            </div>
        </div>
        `);
        var block = $(".content-sub-sub > .embed-responsive > .embed-responsive-item > pre > code")[0];
        $(block).load(encodeURI(file), function() {
            hljs.highlightBlock(block);
        });
    }
    
    $.ajax({
        url: "json/contest.json",
        async: false,
        success: function (d) {
            for (var i of d) {
                $(".sidebar > ul").append(`
                <li class="nav-item contest-name">
                    <a class="nav-link" data-toggle="collapse" href="#${i["slug"]}">${i["nama"]}</a>
                </li>
                <div class="collapse" id="${i["slug"]}">
                </div>
                `);
                for (var j of i["stage"]) {
                    $("#" + i["slug"]).append(`
                    <li class="nav-item">
                        <a class="nav-link contest-stage">${j}</a>
                    </li>
                    `);
                }            
            }
        },
        error: function(d) {
            alert("data not found");
        } 
    });
    
    $(document).on("click", ".nav-link.prob", function() {
        if (current_active_subcontent != null) {
            $(current_active_subcontent).removeClass("active");
        }
        current_active_subcontent = $(this);
        $(current_active_subcontent).addClass("active");
        
        if ($(this).html() == "Detail") {
            get_detail_contest();
        } else {
            problem = $(this).html();
            get_problem();
        }
    });
    
    $(document).on("click", ".contest-stage", function () {
        if (current_active_content != null) {
            $(current_active_content).removeClass("active");
        }
        current_active_content = $(this);
        $(current_active_content).addClass("active");
        
        //load json
        slug = $(this).parent().parent().attr("id");
        stage = $(this).html();
        
        $.ajax({
            url: "json/contest/" + slug + "_" + stage + ".json",
            async: false,
            success: function (d) {
                $(".content > ul").html(`
                <li class="nav-item">
                    <a class="nav-link prob active">Detail</a>
                </li>
                `);
                
                if (current_active_subcontent != null) {
                    $(current_active_subcontent).removeClass("active");
                }
                
                current_active_subcontent = $(".nav-link.prob.active");
                
                for (var i of d["problem"]) {
                    $(".content > ul").append(`
                    <li class="nav-item">
                        <a class="nav-link prob">${i}</a>
                    </li>
                    `);
                }
                get_detail_contest();
            },
            error: function(d) {
                alert("data not found");
            }
        });
    });
    
    $(document).on("click", "#solution", function () {
        $("#problem").removeClass("active");
        $("#btnSolution").addClass("active");
        
        get_solution($(this).attr("sol"));
    });
    
    $(document).on("click", "#problem", function () {
        $("#btnSolution").removeClass("active");
        $(this).addClass("active");
        get_problem();
    });
});