import { motion } from "framer-motion";
import { Camera, Instagram, Heart, Share2 } from "lucide-react";

const photos = [
  { url: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=800", size: "large" },
  { url: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800", size: "small" },
  { url: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800", size: "large" },
  { url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", size: "small" },
  { url: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { url: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800", size: "large" }
];

export const Galeria = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-background min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Momentos Reais</span>
            <h1 className="text-5xl md:text-8xl font-bold text-primary tracking-tight leading-tight">
              Galeria de <br />
              <span className="text-accent italic font-medium">Experiências.</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white px-6 py-4 rounded-2xl shadow-xl shadow-primary/5 border border-primary/5 font-bold text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
              Seguir no Instagram
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[2rem] md:rounded-[3rem] group cursor-pointer shadow-lg ${
                photo.size === "large" ? "col-span-2 row-span-2" : 
                photo.size === "medium" ? "col-span-1 row-span-2" : 
                "col-span-1 row-span-1"
              }`}
            >
              <img
                src={photo.url}
                alt="Travel Moment"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors">
                  <Heart size={20} />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors">
                  <Share2 size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/5 px-12 py-8 rounded-[3rem] border border-primary/5">
            <Camera size={32} className="text-accent" />
            <div className="text-left">
              <div className="text-xl font-bold text-primary">Sua foto aqui?</div>
              <div className="text-sm font-semibold text-primary/40">Use a hashtag #RenanturPeloMundo</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
