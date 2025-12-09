const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("./models/Movie");
const List = require("./models/List");

dotenv.config();

// Dữ liệu phim mẫu (Cyberpunk & Sci-Fi)
const sampleMovies = [
    {
        title: "The Matrix",
        desc: "Một hacker phát hiện ra thực tại chỉ là mô phỏng.",
        img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
        imgTitle: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The_Matrix_Logo.svg/1200px-The_Matrix_Logo.svg.png",
        imgSm: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        trailer: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        year: "1999",
        limit: 16,
        genre: "sci-fi",
        isSeries: false
    },
    {
        title: "Interstellar",
        desc: "Hành trình xuyên không gian tìm kiếm ngôi nhà mới cho nhân loại.",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        imgTitle: "Interstellar",
        imgSm: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
        trailer: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        year: "2014",
        limit: 13,
        genre: "sci-fi",
        isSeries: false
    },
    {
        title: "Blade Runner 2049",
        desc: "Cảnh sát K khám phá ra bí mật chôn vùi từ lâu.",
        img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        imgTitle: "Blade Runner",
        imgSm: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2070&auto=format&fit=crop",
        trailer: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        year: "2049",
        limit: 18,
        genre: "cyberpunk",
        isSeries: false
    },
    {
        title: "Cyber City",
        desc: "Thành phố tương lai.",
        img: "https://images.unsplash.com/photo-1614728853913-1e32005e3073?q=80&w=2070&auto=format&fit=crop",
        imgTitle: "Cyber City",
        imgSm: "https://images.unsplash.com/photo-1614728853913-1e32005e3073?q=80&w=2070&auto=format&fit=crop",
        trailer: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761",
        year: "2077",
        limit: 18,
        genre: "cyberpunk",
        isSeries: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Đã kết nối DB để nạp dữ liệu...");

        // Xóa dữ liệu cũ để tránh trùng lặp
        await Movie.deleteMany({});
        await List.deleteMany({});

        // Thêm phim mới
        const createdMovies = await Movie.insertMany(sampleMovies);
        console.log("🎬 Đã thêm 4 bộ phim mẫu!");

        // Tạo danh sách (Lấy ID của các phim vừa tạo để nhét vào danh sách)
        // Để đơn giản cho Frontend sinh viên, ta lưu thẳng Object phim vào content (hoặc ID tuỳ logic)
        // Ở đây ta lưu ID như chuẩn, nhưng Frontend sẽ cần sửa xíu để fetch. 
        // -> Cách tối ưu cho sinh viên: Lưu thẳng object phim vào content để đỡ phải fetch nhiều lần

        const list1 = new List({
            title: "Phim Viễn Tưởng Hot",
            type: "movie",
            genre: "sci-fi",
            content: createdMovies.map(m => m._id) // Lưu ID
        });

        const list2 = new List({
            title: "Cyberpunk Collection",
            type: "movie",
            genre: "cyberpunk",
            content: createdMovies.map(m => m._id)
        });

        await list1.save();
        await list2.save();

        console.log("Đã thêm 2 danh sách phim!");
        console.log("HOÀN TẤT! Bạn có thể tắt file này.");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

seedDB();