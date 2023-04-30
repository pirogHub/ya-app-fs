const Autor = require("../data/Author");
const Seeker = require("../data/Seeker");
const configGenerator = require("../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../randomTools/randomTools")
const FullAdditionaly = {
    fullAdditionaly: {
        label: "Дополнительно",
        wrapper: "group",
        components: {
            filters: {
                isNotRequired: true,
                mongoType: [String],
                author: {

                    random: function () {

                        this.filters = Math.random() > 0.5 ? ["Показ онлайн"] : []
                    },
                    type: "showOnline",

                },
                seeker: {

                    random: function () { this.filters = [...randomTools.getRandomValueFrom(Seeker.Options.anotherFilters, true, "checkbox")] },

                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...Seeker.Options.anotherFilters],
                        optionsView: "button",
                        noOptionsWrapper: true
                    })
                }
            }
        }



    }
}

module.exports = FullAdditionaly