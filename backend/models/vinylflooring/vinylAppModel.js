    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const VinylApplicationSchema = new mongoose.Schema({
      yellow_title: {
        type: String,
      },
      black_title: {
        type: String,
      },
      application: [
        {
          image: {
            type: Array,
            required: true,
          },
          alt: {
            type: String,
            required: true,
          },
          icon: {
            type: Array,
            required: true,
          },
          icon_alt: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          link: {
            type: String,
          },
          products:
            [
              {
            type: mongoose.Types.ObjectId,
            ref: "vinylproducts",
              }
            ]
        },
      ],
    });

    const VinylApplicationModel = mongoose.model(
      "vinylapplication",
      VinylApplicationSchema
    );

    module.exports = VinylApplicationModel;
