
const Autor = require("../data/Author");
const randomTools = require("../randomTools/randomTools");



const FullDescription = ({ GroupLabel = "", features = {} } = {}) => ({
    description: {
        label: (GroupLabel ? GroupLabel : "Описание"),
        wrapper: "group",
        components: {
            story: {
                mongoType: String,
                author: {
                    random: function () { this.story = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores porro ad, sed eaque maxime explicabo nulla error perferendis vel officiis, recusandae placeat vero. Dolore, est consequuntur et asperiores voluptates nostrum necessitatibus fugiat magni porro tenetur obcaecati. Quia tempora iusto expedita rerum aut cumque architecto quae? Porro non rerum nobis, dolore asperiores explicabo in magni ipsa quasi harum laboriosam nam autem sint, possimus sapiente quae maxime animi iure unde tenetur. Sequi minus, placeat molestias doloremque ipsum pariatur aspernatur dolorem animi eveniet omnis quidem blanditiis provident tempore odit maiores ratione beatae. Rem, earum optio. Itaque exercitationem nostrum quam dolores recusandae vitae? Nesciunt odit repudiandae, rerum eaque deleniti optio tempora corporis dolorem quos quo officia molestias, dignissimos illum vitae dolores! Adipisci amet consectetur hic, eum aspernatur ex quasi perspiciatis aperiam asperiores omnis veritatis corrupti expedita suscipit reprehenderit. Fuga consequuntur quae, quos explicabo sit id dolorem tempora accusantium assumenda exercitationem enim iste nisi inventore! Repellat nisi fugiat modi quia magnam, numquam hic adipisci praesentium aspernatur facere veritatis ex vel sit voluptatum beatae, quibusdam quae deleniti temporibus. Quo esse ea commodi eius cum qui assumenda consequuntur libero quasi! Modi, voluptatem incidunt dolorum voluptates vel dicta explicabo laboriosam temporibus vero recusandae consectetur sequi, culpa, necessitatibus enim?" },
                    type: "textArea",
                    config: {
                        name: "story",
                        placeholder: "Опишите недвижимость"
                    }
                }
            },
            ...(features ? features : {})

        }



    }
}
)

module.exports = FullDescription