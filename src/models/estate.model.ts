import mongoose, { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import Counter from "./counter.model";

interface ImageDocument extends mongoose.Document {
    origin: string;
    resource_type: "image" | "video";
    cloud_name: string;
    action: string;
    version: number;
    name: string;
    public_id: string;
    extension: string;
}

export interface EstateDocument extends mongoose.Document {
    custom_id: string;
    priority: number;
    is_published: boolean;
    title: string;
    description: string;
    price: string;
    square: string;
    category: {
        name: string;
        slug: string;
    };
    properties: [
        {
            name: string;
            slug: string;
        }
    ];
    location: {
        street: string;
        ward: {
            ward_id: mongoose.Types.ObjectId;
            name: string;
            slug: string;
        };
        district: {
            district_id: mongoose.Types.ObjectId;
            name: string;
            slug: string;
        };
        city: {
            city_id: mongoose.Types.ObjectId;
            name: string;
            slug: string;
        };
    };
    contact: {
        contact_id: mongoose.Types.ObjectId;
        name: string;
        phone: string;
    };
    avatar: ImageDocument;
    images: [ImageDocument];
    videos: [string];
}

const imageSchema = new mongoose.Schema<ImageDocument>({
    origin: String,
    resource_type: {
        type: String,
        enum: ["image", "video"],
    },
    cloud_name: String,
    action: String,
    version: Number,
    name: String,
    public_id: String,
    extension: String,
});

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
            name: String,
            slug: String,
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
                ward_id: mongoose.Types.ObjectId,
                name: String,
                slug: String,
            },
            district: {
                district_id: mongoose.Types.ObjectId,
                name: String,
                slug: String,
            },
            city: {
                city_id: mongoose.Types.ObjectId,
                name: String,
                slug: String,
            },
        },
        contact: {
            contact_id: mongoose.Types.ObjectId,
            name: String,
            phone: String,
        },
        avatar: imageSchema,
        images: [imageSchema],
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
        const counter = await Counter.findOne({ name: "estate" });
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
