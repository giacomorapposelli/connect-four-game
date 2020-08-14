(function () {
    var currentPlayer = "player1";
    var slots = $(".slot");

    $(".column").on("click touchstart", function (event) {
        var selectedColumn = $(event.currentTarget);
        var slotsInColumn = selectedColumn.children();
        var emptySlotsFound;
        event.stopPropagation();

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                emptySlotsFound = true;
                break;
            }
        }
        if ($("#board").hasClass("animation")) {
            $("#board").removeClass("animation");
        }
        if (!emptySlotsFound) {
            $("#board").addClass("animation");
            setTimeout(function () {
                $("#board").removeClass("animation");
            }, 500);
            $(".alert").css({ display: "block" });
            setTimeout(function () {
                $(".alert").css({ display: "none" });
            }, 500);
        }
        if (checkForVictory(slots)) {
            $(".winner").css({ display: "block" });
            $("#board").css({
                animation: "shake 4s",
                animationIterationCount: "initial",
            });
            $("button").css({ backgroundColor: "white" });
            setTimeout(function () {
                $(".winner").css({ display: "none" });
            }, 4000);

            if (currentPlayer === "player1") {
                $(".winner").css({ color: "red" });
                $(".winner").html("RED WINS");
            } else {
                $(".winner").css({ color: "gold" });
                $(".winner").html("YELLOW WINS");
            }
            $(".column").off("click");
        } else {
            switchPlayers();
        }
    });

    function switchPlayers() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function checkForVictory(slots) {
        var count = 0;
        var diagVictories = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
        ];
        // vertical victory
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    slots.eq(i).addClass("white");
                    slots
                        .eq(i)
                        .html(
                            "<div class='hole'><div class='circle'></div></div>"
                        );
                    setTimeout(function () {
                        slots.eq(i - 1).addClass("white");
                        slots
                            .eq(i - 1)
                            .html(
                                "<div class='hole'><div class='circle'></div></div>"
                            );
                    }, 500);
                    setTimeout(function () {
                        slots.eq(i - 2).addClass("white");
                        slots
                            .eq(i - 2)
                            .html(
                                "<div class='hole'><div class='circle'></div></div>"
                            );
                    }, 1000);
                    setTimeout(function () {
                        slots.eq(i - 3).addClass("white");
                        slots
                            .eq(i - 3)
                            .html(
                                "<div class='hole'><div class='circle'></div></div>"
                            );
                    }, 1500);
                    return true;
                }
            } else {
                count = 0;
            }
        }
        // horizontal victory
        for (var i = 0; i < 7; i++) {
            var slotsInRow = $(".row" + i);
            for (var j = 0; j < slotsInRow.length; j++) {
                if (slotsInRow.eq(j).hasClass(currentPlayer)) {
                    count++;
                    if (count === 4) {
                        console.log(slotsInRow.eq(j - 1));
                        slotsInRow.eq(j - 3).addClass("white");
                        slotsInRow
                            .eq(j - 3)
                            .html(
                                "<div class='hole'><div class='circle'></div></div>"
                            );
                        setTimeout(function () {
                            slotsInRow.eq(j - 2).addClass("white");
                            slotsInRow
                                .eq(j - 2)
                                .html(
                                    "<div class='hole'><div class='circle'></div></div>"
                                );
                        }, 500);
                        setTimeout(function () {
                            slotsInRow.eq(j - 1).addClass("white");
                            slotsInRow
                                .eq(j - 1)
                                .html(
                                    "<div class='hole'><div class='circle'></div></div>"
                                );
                        }, 1000);
                        setTimeout(function () {
                            slotsInRow.eq(j).addClass("white");
                            slotsInRow
                                .eq(j)
                                .html(
                                    "<div class='hole'><div class='circle'></div></div>"
                                );
                        }, 1500);
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        // diagonal victory
        for (var i = 0; i < diagVictories.length; i++) {
            if (
                slots.eq(diagVictories[i][0]).hasClass(currentPlayer) &&
                slots.eq(diagVictories[i][1]).hasClass(currentPlayer) &&
                slots.eq(diagVictories[i][2]).hasClass(currentPlayer) &&
                slots.eq(diagVictories[i][3]).hasClass(currentPlayer)
            ) {
                slots.eq(diagVictories[i][3]).addClass("white");
                slots
                    .eq(diagVictories[i][3])
                    .html("<div class='hole'><div class='circle'></div></div>");
                setTimeout(function () {
                    slots.eq(diagVictories[i][2]).addClass("white");
                    slots
                        .eq(diagVictories[i][2])
                        .html(
                            "<div class='hole'><div class='circle'></div></div>"
                        );
                }, 500);
                setTimeout(function () {
                    slots.eq(diagVictories[i][1]).addClass("white");
                    slots
                        .eq(diagVictories[i][1])
                        .html(
                            "<div class='hole'><div class='circle'></div></div>"
                        );
                }, 1000);
                setTimeout(function () {
                    slots.eq(diagVictories[i][0]).addClass("white");
                    slots
                        .eq(diagVictories[i][0])
                        .html(
                            "<div class='hole'><div class='circle'></div></div>"
                        );
                }, 1500);
                return true;
            }
        }
    }

    $("button").on("click", function () {
        location.reload();
    });
})();
