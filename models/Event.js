import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        registrationDeadline: Date,
        logo: String,
        isPublic: { type: Boolean, default: true },
        organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["draft", "upcoming", "ongoing", "completed"],
            default: "draft",
        },
        minTeamSize: { type: Number, default: 2 },
        maxTeamSize: { type: Number, default: 4 },

        judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        rules: [String],
        tracks: [String],
    },
    { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
