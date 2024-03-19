import axios from "axios";
import { createPost } from "../routes/routes";

const datas = [
	{
		name: "WADOO",
		prompt: "A post-apocalyptic world where survivors battle for control of dwindling resources.",
		image: "https://m.media-amazon.com/images/I/81A+qqYaYFL._AC_UF1000,1000_QL80_.jpg",
	},
	{
		name: "Lalan Kumarm,",
		prompt: "A group of explorers discovering a lost city hidden in the mountains.",
		image: "https://i.pinimg.com/736x/2d/b4/82/2db482a8bde2b1aa18fc79f24122afd0.jpg",
	},
	{
		name: "WADOO",
		prompt: "A post-apocalyptic world where survivors battle for control of dwindling resources.",
		image: "https://images3.alphacoders.com/151/151339.jpg",
	},
	{
		name: "WAH RE BABA",
		prompt: "A cybernetic cityscape where humans and robots coexist uneasily.",
		image: "https://akns-images.eonline.com/eol_images/Entire_Site/2017216/rs_634x952-170316094114-ThorRagnarok58c9d18ec0d49.jpg?fit=around%7C634:952&output-quality=90&crop=634:952;center,top",
	},
	{
		name: "Lalan Kumarm,",
		prompt: "A fantastical cityscape with buildings made of crystal and gold.",
		image: "https://ew.com/thmb/cvyPMsFUWhBV6fMlukeeUgivVrY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mcdavag_ec093-2000-8c25f1ffa7474b20ab48a1d6e00ee740.jpg",
	},
	{
		name: "Noby Rraundl",
		prompt: "Power of One, The",
		image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
	},
	{
		name: "Arabele McAreavey",
		prompt: "Letters to Father Jacob (Postia pappi Jaakobille)",
		image: "https://assets-prd.ignimgs.com/2023/10/25/spidey-killer-blog-1698225391524.jpg",
	},
	{
		name: "Fredi Mularkey",
		prompt: "Night Terrors",
		image: "https://www.cnet.com/a/img/resize/8d159fb0c99a75843d3585dd2ae8cc9e6fa12773/hub/2017/08/03/75c3b0ae-5a2d-4d75-b72b-055247b4378f/marvelinfinitywar-captainamerica.jpg?auto=webp&fit=crop&height=1200&width=1200",
	},
	{
		name: "Noby Rraundl",
		prompt: "Power of One, The",
		image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/11/Captain-America-15-Steve-Rogers-Quotes-That-Inspire-All-of-Us.jpg",
	},
	{
		name: "Arabele McAreavey",
		prompt: "Letters to Father Jacob (Postia pappi Jaakobille)",
		image: "https://www.superherotoystore.com/cdn/shop/articles/captain-america-marvel-comics.webp?v=1696315590&width=1024",
	},
];

export const inserrecords = async () => {
	try {
		for (let index = 0; index < datas.length; index++) {
			const element = datas[index];
			element.createdDate = new Date();
			console.log(element);
			const { data } = await axios.post(createPost, element);
			console.log(data);
		}
	} catch (error) {
		console.log(error.message);
	}
};
