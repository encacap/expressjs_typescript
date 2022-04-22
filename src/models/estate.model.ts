import mongoose, { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import Counter from "./counter.model";

export interface EstateDocument extends mongoose.Document {
    custom_id: string;
    priority: number;
    is_published: boolean;
    title: string;
    description: string;
    price: string;
    square: string;
    category: mongoose.Schema.Types.ObjectId;
    properties: [
        {
            name: string;
            value: string;
        }
    ];
    location: {
        street: string;
        ward: mongoose.Schema.Types.ObjectId;
        district: mongoose.Schema.Types.ObjectId;
        city: mongoose.Schema.Types.ObjectId;
    };
    contact: mongoose.Schema.Types.ObjectId;
    avatar: mongoose.Schema.Types.ObjectId;
    images: [mongoose.Schema.Types.ObjectId];
    videos: [string];
}

const estateSchema = new mongoose.Schema<EstateDocument, PaginateModel<EstateDocument>>(
    {
        custom_id: String,
        priority: {
            type: Number,
            default: Date.now(),
            required: true,
        },
        is_published: {
            type: Boolean,
            default: false,
        },
        title: String,
        description: String,
        price: String,
        square: Number,
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        properties: [
            {
                name: String,
                slug: String,
            },
        ],
        location: {
            street: String,
            ward: {
                type: mongoose.Types.ObjectId,
                ref: "Ward",
            },
            district: {
                type: mongoose.Types.ObjectId,
                ref: "District",
            },
            city: {
                type: mongoose.Types.ObjectId,
                ref: "City",
            },
        },
        contact: {
            type: mongoose.Types.ObjectId,
            ref: "Contact",
        },
        avatar: {
            type: mongoose.Types.ObjectId,
            ref: "Image",
        },
        images: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Image",
            },
        ],
        videos: [String],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

paginate.paginate.options = {
    customLabels: {
        docs: "data",
        totalDocs: "total",
        limit: "per_page",
        page: "current_page",
        nextPage: "next_page",
        prevPage: "prev_page",
        totalPages: "last_page",
        pagingCounter: "total_pages",
        hasPrevPage: "has_prev_page",
        hasNextPage: "has_next_page",
        meta: "meta",
    },
};

estateSchema.plugin(paginate);

estateSchema.pre("save", async function bindCustomId(next) {
    const estate = this as EstateDocument;

    if (estate.isNew) {
        let counter = await Counter.findOne({ name: "estate" });
        if (!counter) {
            counter = new Counter({ name: "estate", value: 0 });
            await counter.save();
        }
        const value = counter.value + 1;
        if (!estate.custom_id) {
            estate.custom_id = String(value);
            counter.value = value;
            await counter.save();
        }
    }

    next();
});

/**
 * @typedef {Object<EstateDocument>} Estate
 */
const Estate = mongoose.model<EstateDocument, PaginateModel<EstateDocument>>("Estate", estateSchema);

export default Estate;
