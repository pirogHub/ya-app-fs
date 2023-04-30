const Author = require("../../data/Author");
const Seeker = require("../../data/Seeker");
const configGenerator = require("../../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../../randomTools/randomTools");


const data = require("./data")


const FullAboutFlat = (category) => {
    const curData = data?.[category]

    if (!curData) throw new Error()

    return {
        aboutFlat: {
            label: "О Квартире",
            wrapper: "group",
            components: {
                rooms: {
                    author: {
                        rooms_total: {
                            mongoType: [String || Number],
                            random: function () { this.rooms_total = [+randomTools.getRandomValueFrom(curData.roomsCount, false, "radio")] },

                        },
                        ...(category === "room"
                            ? {
                                rooms_forSale: {
                                    mongoType: [String || Number],
                                    random: function () {
                                        this.rooms_forSale = this.rooms_total?.[0]
                                            ? [randomTools.getRandomNumber(+ this.rooms_total?.[0], 1)]
                                            : randomTools.getRandomValueFrom(curData.roomsCount, false, "radio")
                                    },
                                }
                            }
                            : {}
                        ),
                        type: "roomsCount",
                        config:
                            configGenerator.roomsCount({
                                optionsList: curData.roomsCount,
                                inputsView: "circle",
                                tryInputsViewAutoWhenNeed: true,
                                inputsConfig:
                                    category === "room"
                                        ? [
                                            { name: "rooms_total", },
                                            { name: "rooms_forSale", }
                                        ]
                                        : [
                                            { name: "rooms_total", }
                                        ]
                            })

                    },
                    seeker: {
                        // type: "components",
                        components: {
                            rooms_total: {
                                label: "Комнат Всего",
                                type: "TwoInputs",
                                random: function () {

                                    this.rooms_total = {} // randomTools.getRandomValueFrom(Seeker.Options.roomsCount, true, "checkbox")

                                    const [from1, to1] = randomTools.getRandomFromTo({
                                        max: 7, min: 1, canBeEmpty: true
                                    })
                                    this.rooms_total.$gte = from1
                                    this.rooms_total.$lte = to1
                                },

                                config: configGenerator.textInputGroup({
                                    divider: "-",
                                    collectiveBorder: true,
                                    inputsConfig: [
                                        { name: "$gte", placeholder: "от", maxLength: 4, size: 4 },
                                        { name: "$lte", placeholder: "до", maxLength: 4, size: 4 }
                                    ],
                                    Postfix: "шт"
                                }),
                            },
                            // random: function () {
                            //     this.rooms = {}
                            //     this.rooms.rooms_total = randomTools.getRandomValueFrom(Seeker.Options.roomsCount, true, "checkbox")
                            // },
                            ...(category === "room"
                                ? {
                                    rooms_forSale: {
                                        label: "Комнат на Продажу",
                                        type: "TwoInputs",
                                        random: function () {

                                            this.rooms_forSale = {}// randomTools.getRandomValueFrom(Seeker.Options.roomsCount, true, "checkbox")

                                            const [from1, to1] = randomTools.getRandomFromTo({
                                                max: 7, min: 1, canBeEmpty: true
                                            })
                                            this.rooms_forSale.$gte = from1
                                            this.rooms_forSale.$lte = to1
                                        },

                                        config: configGenerator.textInputGroup({
                                            divider: "-",
                                            collectiveBorder: true,
                                            inputsConfig: [
                                                { name: "$gte", placeholder: "от", maxLength: 4, size: 4 },
                                                { name: "$lte", placeholder: "до", maxLength: 4, size: 4 }
                                            ],
                                            Postfix: "шт"
                                        }),
                                    }
                                }
                                //     rooms_forSale: {
                                //         random: function () {
                                //             this.rooms_forSale = this.rooms_total
                                //                 ? [randomTools.getRandomNumber(+this.rooms_total, 1)]
                                //                 : randomTools.getRandomValueFrom(curData.roomsCount, false, "radio")
                                //         },
                                //     }
                                // }
                                : {}
                            ),
                        }
                    }
                },
                area: {
                    author: {
                        area_total: {
                            random: function () { this.area_total = `${randomTools.getRandomNumber(300, 10, 1)}` },
                            mongoType: String
                        },
                        area_forLive: {
                            random: function () { this.area_forLive = `${randomTools.getRandomNumber(this.area_total ? this.area_total : 300, 10, 1)}` },
                            mongoType: String
                        },
                        area_kitchen: {
                            random: function () { this.area_kitchen = `${(this.area_total - this.area_forLive).toFixed(2)}` },
                            mongoType: String
                        },
                        label: "Площадь, м²",
                        type: "textInputGroup",
                        config: {
                            inputsConfig: [
                                { name: "area_total", label: "Общая" },
                                { name: "area_forLive", label: "Жилая" },
                                { name: "area_kitchen", label: "Кухня" },
                            ]
                        }
                    },
                    seeker: {
                        area_kitchen: {  //issue if parent "area"
                            label: "Кухня, м²",
                            type: "TwoInputs",
                            random: function () {
                                this.area_total = {}
                                const [from1, to1] = randomTools.getRandomFromTo({
                                    max: 300, min: 11, canBeEmpty: true
                                })
                                this.area_total.$gte = from1
                                this.area_total.$lte = to1
                                this.area_kitchen = {}
                                const [from2, to2] = randomTools.getRandomFromTo({
                                    max: to1, min: 10, canBeEmpty: true
                                })
                                this.area_kitchen.$gte = from2
                                this.area_kitchen.$lte = to2
                            },

                            config: configGenerator.textInputGroup({
                                divider: "-",
                                collectiveBorder: true,
                                inputsConfig: [
                                    { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                                    { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                                ],
                                Postfix: "м²"
                            })
                        },
                    }
                },
                floors: {
                    author: {
                        label: "Этаж",
                        type: "TwoInputs",

                        floor_total: { mongoType: Number },
                        floor_current: { mongoType: Number },

                        random: function () {
                            this.floors = {}
                            const [from, to] = randomTools.getRandomFromTo({
                                max: 50, min: 1, canBeEmpty: false
                            })
                            this.floors.floor_total = to
                            this.floors.floor_current = from
                        },

                        config: configGenerator.textInputGroup({
                            divider: "из",
                            // collectiveBorder: true,
                            isInputBorder: true,
                            inputsConfig: [
                                { name: "floor_total", placeholder: "", maxLength: 4, size: 4 },
                                { name: "floor_current", placeholder: "", maxLength: 4, size: 4 }
                            ],
                            // Postfix: "м²"
                        })
                    },
                    seeker: {
                        label: "Этаж",
                        type: "components",
                        components: {
                            floor_current: {
                                label: "",
                                type: "TwoInputs",

                                random: function () {
                                    this.floor_current = {}
                                    const [from, to] = randomTools.getRandomFromTo({
                                        max: 100, min: 1, canBeEmpty: false, toFixed: 0
                                    })
                                    this.floor_current.$gte = from
                                    this.floor_current.$lte = to
                                    // this.floor_current.$gte = `${randomTools.getRandomNumber(300, 10, 1)}`
                                    // this.floor_current.$lte = `${randomTools.getRandomNumber(300, +this.range.$gte, 1)}`

                                },

                                config: configGenerator.textInputGroup({
                                    divider: "-",
                                    collectiveBorder: true,
                                    inputsConfig: [
                                        { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                                        { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                                    ],
                                })
                            },
                            clarification: {
                                random: function () { this.clarification = [...randomTools.getRandomValueFrom(Seeker.Options.floorClarification, true, "checkbox")] },
                                label: "",
                                type: "checkbox",
                                config: configGenerator.radioCheckbox({
                                    options: [...Seeker.Options.floorClarification],
                                    optionsView: "button",
                                    aloneVal: true
                                }),
                            }
                        }

                    },
                },
                ceilHeight: {
                    author: {
                        mongoType: String,
                        random: function () { this.ceilHeight = `${randomTools.getRandomNumber(4, 1, 1)}` },
                        label: "Высота потолков, м",
                        type: "input",
                        config: {
                            // type: "number"
                        }
                    },
                    seeker: {
                        label: "Высота потолков, м",
                        type: "TwoInputs",
                        random: function () {
                            this.ceilHeight = {}
                            this.ceilHeight.$gte = `${randomTools.getRandomNumber(4, 1, 1)}`
                            this.ceilHeight.$lte = `${randomTools.getRandomNumber(4, +this.ceilHeight.$gte, 1)}`

                        },
                        config: configGenerator.textInputGroup({
                            divider: "-",
                            collectiveBorder: true,
                            inputsConfig: [
                                { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                                { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                            ],
                            Postfix: "м "
                        })
                    }
                },
                buildingStatus: {
                    author: {
                        random: function () { this.buildingStatus = [...randomTools.getRandomValueFrom(curData.buildingStatus)] },
                        mongoType: [String],
                        label: "Статус",
                        type: "radio",
                        config: {
                            options: [...curData.buildingStatus],
                            optionsView: "button"
                        },
                    },
                    seeker: {
                        random: function () { this.buildingStatus = [...randomTools.getRandomValueFrom(curData.buildingStatus, true, "checkbox")] },
                        label: "Статус",
                        type: "checkbox",
                        config: configGenerator.radioCheckbox({
                            options: [...curData.buildingStatus],
                            optionsView: "button"
                        }),
                    }
                },
                toilet: {
                    author: {
                        random: function () { this.toilet = [...randomTools.getRandomValueFrom(curData.toilet)] },
                        mongoType: [String],
                        label: "Санузел",
                        type: "radio",
                        config: {
                            options: [...curData.toilet],
                            optionsView: "button"
                        },
                    },
                    seeker: {
                        random: function () { this.toilet = [...randomTools.getRandomValueFrom(curData.toilet, true, "checkbox")] },
                        label: "Санузел",
                        type: "checkbox",
                        config: configGenerator.radioCheckbox({
                            options: [...curData.toilet],
                            optionsView: "button"
                        }),
                    }
                },
                // balcony: {
                //     mongoType: [String],
                //     label: "Балкон",
                //     type: "radio",
                //     config: {
                //         options: [],
                //         optionsView: "button"
                //     }
                // },
                typeFloor: {
                    author: {
                        random: function () { this.typeFloor = [...randomTools.getRandomValueFrom(curData.typeFloor)] },
                        mongoType: [String],
                        label: "Покрытие пола",
                        type: "radio",
                        config: {
                            options: [...curData.typeFloor],
                            optionsView: "button"
                        },
                    },
                    seeker: {
                        random: function () { this.typeFloor = [...randomTools.getRandomValueFrom(curData.typeFloor, true, "checkbox")] },
                        label: "Покрытие пола",
                        type: "checkbox",
                        config: configGenerator.radioCheckbox({
                            options: [...curData.typeFloor],
                            optionsView: "button"
                        }),
                    }
                },
                renovation: {
                    author: {
                        random: function () { this.renovation = [...randomTools.getRandomValueFrom(curData.renovation)] },
                        mongoType: [String],
                        label: "Ремонт",
                        type: "radio",
                        config: {
                            options: [...curData.renovation],
                            optionsView: "button"
                        },
                    },
                    seeker: {
                        random: function () { this.renovation = [...randomTools.getRandomValueFrom(curData.renovation, true, "checkbox")] },
                        label: "Ремонт",
                        type: "checkbox",
                        config: configGenerator.radioCheckbox({
                            options: [...curData.renovation],
                            optionsView: "button"
                        }),
                    }
                },
                windows: {
                    author: {
                        random: function () { this.windows = [...randomTools.getRandomValueFrom(curData.windows, false, "checkbox")] },
                        mongoType: [String],
                        label: "Окна",
                        type: "checkbox",
                        config: {
                            options: [...curData.windows],
                            optionsView: "button"
                        }
                    },
                    seeker: {
                        random: function () { this.windows = [...randomTools.getRandomValueFrom(curData.windows, true, "checkbox")] },
                        label: "Окна",
                        type: "checkbox",
                        config: configGenerator.radioCheckbox({
                            options: [...curData.windows],
                            optionsView: "button"
                        }),
                    }
                }
            }

        }

    }
}


module.exports = FullAboutFlat