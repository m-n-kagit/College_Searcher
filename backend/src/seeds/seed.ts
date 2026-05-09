import "dotenv/config";
import pg from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

// 1. Setup the PG pool
const pool = new pg.Pool({ connectionString });
// 2. Setup the Adapter
const adapter = new PrismaPg(pool);
// 3. Pass the adapter to the Client
const prisma = new PrismaClient({ adapter });

// ... rest of your seed logic ...
function parseFees(feesStr: string): number {
  const numericPart = parseFloat(feesStr.replace(/[^\d.]/g, ''));
  if (isNaN(numericPart)) return 0;
  if (feesStr.toLowerCase().includes('lac')) {
    return Math.round(numericPart * 100000);
  }
  return Math.round(numericPart);
}

const collegesToSeed = [
  // --- IITs (Engineering - High Tier) ---
  { name: "IIT Bombay", location: "Mumbai, Maharashtra", description: "Top-tier engineering research and placements.", rating: 4.8, courseName: "B.Tech Computer Science", fees: "8.50 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 67, avgPackage: 26.5, highestPackage: 110.0 },
  { name: "IIT Delhi", location: "New Delhi, Delhi", description: "Renowned for its technical excellence and startup culture.", rating: 4.7, courseName: "B.Tech Computer Science", fees: "8.80 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 115, avgPackage: 25.8, highestPackage: 105.0 },
  { name: "IIT Madras", location: "Chennai, Tamil Nadu", description: "Consistent NIRF Rank 1 for several years.", rating: 4.8, courseName: "B.Tech Electrical Engineering", fees: "8.20 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 600, avgPackage: 22.0, highestPackage: 85.0 },
  { name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", description: "Strong focus on research and computer science.", rating: 4.6, courseName: "B.Tech Data Science", fees: "8.40 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 230, avgPackage: 24.0, highestPackage: 95.0 },
  { name: "IIT Kharagpur", location: "Kharagpur, West Bengal", description: "Oldest IIT with the largest campus area.", rating: 4.5, courseName: "B.Tech Mechanical Engineering", fees: "8.10 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 1800, avgPackage: 19.5, highestPackage: 70.0 },
  { name: "IIT Roorkee", location: "Roorkee, Uttarakhand", description: "Oldest engineering institution in Asia.", rating: 4.6, courseName: "B.Tech Civil Engineering", fees: "8.60 Lacs", duration: 4, exam: "JEE Advanced", closingRank: 3500, avgPackage: 18.2, highestPackage: 65.0 },

  // --- IIMs (Management - High Tier) ---
  { name: "IIM Ahmedabad", location: "Ahmedabad, Gujarat", description: "Premier management school in India.", rating: 4.9, courseName: "PGP in Management", fees: "28.00 Lacs", duration: 2, exam: "CAT", closingRank: 99.9, avgPackage: 32.8, highestPackage: 75.0 },
  { name: "IIM Bangalore", location: "Bangalore, Karnataka", description: "Strong focus on entrepreneurship and consulting.", rating: 4.8, courseName: "PGP in Management", fees: "24.50 Lacs", duration: 2, exam: "CAT", closingRank: 99.8, avgPackage: 31.5, highestPackage: 80.0 },
  { name: "IIM Calcutta", location: "Kolkata, West Bengal", description: "Known as the Finance Campus of India.", rating: 4.8, courseName: "PGP in Management", fees: "25.00 Lacs", duration: 2, exam: "CAT", closingRank: 99.7, avgPackage: 31.0, highestPackage: 90.0 },
  { name: "IIM Lucknow", location: "Lucknow, Uttar Pradesh", description: "Famous for its rigorous academic curriculum.", rating: 4.6, courseName: "PGP in Management", fees: "21.50 Lacs", duration: 2, exam: "CAT", closingRank: 99.0, avgPackage: 28.5, highestPackage: 65.0 },
  { name: "IIM Indore", location: "Indore, Madhya Pradesh", description: "Only IIM with a triple crown accreditation.", rating: 4.5, courseName: "PGP in Management", fees: "21.00 Lacs", duration: 2, exam: "CAT", closingRank: 98.5, avgPackage: 25.2, highestPackage: 55.0 },

  // --- NITs (Engineering - Mid/High Tier) ---
  { name: "NIT Trichy", location: "Trichy, Tamil Nadu", description: "Top ranked NIT with excellent infrastructure.", rating: 4.5, courseName: "B.Tech CSE", fees: "6.50 Lacs", duration: 4, exam: "JEE Main", closingRank: 1500, avgPackage: 18.5, highestPackage: 50.0 },
  { name: "NIT Surathkal", location: "Mangalore, Karnataka", description: "Only NIT with its own private beach.", rating: 4.4, courseName: "B.Tech Information Technology", fees: "6.20 Lacs", duration: 4, exam: "JEE Main", closingRank: 3200, avgPackage: 17.0, highestPackage: 45.0 },
  { name: "NIT Warangal", location: "Warangal, Telangana", description: "First ever NIT (RECW) established in India.", rating: 4.4, courseName: "B.Tech CSE", fees: "6.40 Lacs", duration: 4, exam: "JEE Main", closingRank: 2800, avgPackage: 17.5, highestPackage: 48.0 },
  { name: "NIT Rourkela", location: "Rourkela, Odisha", description: "Vibrant campus with strong research output.", rating: 4.3, courseName: "B.Tech Mechanical Engineering", fees: "6.00 Lacs", duration: 4, exam: "JEE Main", closingRank: 12000, avgPackage: 12.5, highestPackage: 40.0 },
  { name: "NIT Calicut", location: "Calicut, Kerala", description: "High coding culture and tech fests.", rating: 4.2, courseName: "B.Tech ECE", fees: "6.10 Lacs", duration: 4, exam: "JEE Main", closingRank: 9000, avgPackage: 14.0, highestPackage: 38.0 },

  // --- Private / Other Top Engineering ---
  { name: "BITS Pilani", location: "Pilani, Rajasthan", description: "Premier private university with zero attendance policy.", rating: 4.6, courseName: "B.E. Computer Science", fees: "22.50 Lacs", duration: 4, exam: "BITSAT", closingRank: 330, avgPackage: 21.0, highestPackage: 60.0 },
  { name: "BITS Goa", location: "Zuarinagar, Goa", description: "Excellent campus life and technical education.", rating: 4.5, courseName: "B.E. Computer Science", fees: "22.50 Lacs", duration: 4, exam: "BITSAT", closingRank: 290, avgPackage: 19.5, highestPackage: 55.0 },
  { name: "BITS Hyderabad", location: "Hyderabad, Telangana", description: "Modern campus with industry-linked curriculum.", rating: 4.4, courseName: "B.E. Computer Science", fees: "22.50 Lacs", duration: 4, exam: "BITSAT", closingRank: 280, avgPackage: 18.8, highestPackage: 52.0 },
  { name: "VIT Vellore", location: "Vellore, Tamil Nadu", description: "Known for its massive placements and infrastructure.", rating: 4.1, courseName: "B.Tech CSE", fees: "7.80 Lacs", duration: 4, exam: "VITEEE", closingRank: 5000, avgPackage: 9.2, highestPackage: 44.0 },
  { name: "Manipal Institute of Technology", location: "Manipal, Karnataka", description: "Great international exposure and campus life.", rating: 4.2, courseName: "B.Tech CSE", fees: "18.50 Lacs", duration: 4, exam: "MET", closingRank: 2500, avgPackage: 11.5, highestPackage: 45.0 },
  { name: "IIIT Hyderabad", location: "Hyderabad, Telangana", description: "Best for competitive programming and research.", rating: 4.9, courseName: "B.Tech CSE", fees: "14.00 Lacs", duration: 4, exam: "JEE Main", closingRank: 1000, avgPackage: 30.0, highestPackage: 75.0 },
  { name: "SRM University", location: "Chennai, Tamil Nadu", description: "Large diverse student population and multiple fests.", rating: 3.9, courseName: "B.Tech CSE", fees: "10.00 Lacs", duration: 4, exam: "SRMJEEE", closingRank: 15000, avgPackage: 7.5, highestPackage: 41.0 },

  // --- Commerce/Arts/Science ---
  { name: "SRCC - Shri Ram College of Commerce", location: "Delhi, Delhi", description: "The best college in India for Commerce.", rating: 4.7, courseName: "B.Com (Hons)", fees: "0.90 Lacs", duration: 3, exam: "CUET", closingRank: 780, avgPackage: 10.5, highestPackage: 30.0 },
  { name: "LSR - Lady Shri Ram College", location: "Delhi, Delhi", description: "Premier institution for social sciences and arts.", rating: 4.6, courseName: "B.A. Economics (Hons)", fees: "0.60 Lacs", duration: 3, exam: "CUET", closingRank: 775, avgPackage: 9.8, highestPackage: 35.0 },
  { name: "St. Stephens College", location: "Delhi, Delhi", description: "Highly prestigious liberal arts college.", rating: 4.5, courseName: "B.Sc Mathematics", fees: "1.20 Lacs", duration: 3, exam: "CUET", closingRank: 790, avgPackage: 8.5, highestPackage: 25.0 },
  { name: "Loyola College", location: "Chennai, Tamil Nadu", description: "Top ranked college for arts and commerce in South India.", rating: 4.4, courseName: "B.Com", fees: "0.45 Lacs", duration: 3, exam: "Merit", closingRank: 95, avgPackage: 6.5, highestPackage: 15.0 },

  // --- Law / Medical / Design ---
  { name: "NLSIU Bangalore", location: "Bangalore, Karnataka", description: "National Law School of India University.", rating: 4.8, courseName: "B.A. LL.B (Hons)", fees: "12.50 Lacs", duration: 5, exam: "CLAT", closingRank: 90, avgPackage: 15.0, highestPackage: 25.0 },
  { name: "AIIMS New Delhi", location: "Delhi, Delhi", description: "The gold standard for medical education in India.", rating: 4.9, courseName: "MBBS", fees: "0.05 Lacs", duration: 5.5, exam: "NEET", closingRank: 50, avgPackage: 18.0, highestPackage: 40.0 },
  { name: "NID Ahmedabad", location: "Ahmedabad, Gujarat", description: "National Institute of Design - Best for design.", rating: 4.7, courseName: "B.Des", fees: "15.00 Lacs", duration: 4, exam: "DAT", closingRank: 100, avgPackage: 12.0, highestPackage: 30.0 },
  { name: "NLU Delhi", location: "Delhi, Delhi", description: "Top-tier law university focusing on legal research.", rating: 4.6, courseName: "B.A. LL.B", fees: "11.00 Lacs", duration: 5, exam: "AILET", closingRank: 85, avgPackage: 14.5, highestPackage: 22.0 },
  { name: "CMC Vellore", location: "Vellore, Tamil Nadu", description: "Ranked among top medical colleges in India.", rating: 4.7, courseName: "MBBS", fees: "1.50 Lacs", duration: 5.5, exam: "NEET", closingRank: 600, avgPackage: 10.0, highestPackage: 25.0 },
  { name: "MAMC Delhi", location: "Delhi, Delhi", description: "Maulana Azad Medical College.", rating: 4.6, courseName: "MBBS", fees: "0.15 Lacs", duration: 5.5, exam: "NEET", closingRank: 150, avgPackage: 12.0, highestPackage: 30.0 },
  { name: "Christ University", location: "Bangalore, Karnataka", description: "Famous for BBA and holistic education.", rating: 4.1, courseName: "BBA", fees: "6.00 Lacs", duration: 3, exam: "CUET", closingRank: 5000, avgPackage: 7.2, highestPackage: 20.0 }
];

async function main() {
  console.log("🧹 Cleaning existing data...");
  // Delete in order to respect foreign key constraints
  await prisma.savedItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cutoff.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log("🌱 Creating test user...");
  const testUser = await prisma.user.create({
    data: {
      email: "student@test.com",
      password: "hashed_password_here", // In production, use bcrypt
    }
  });

  console.log("🏫 Seeding colleges, courses, and stats...");

  for (const item of collegesToSeed) {
    const college = await prisma.college.create({
      data: {
        name: item.name,
        location: item.location,
        description: item.description,
        overallRating: item.rating,
        courses: {
          create: {
            name: item.courseName,
            fees: parseFees(item.fees),
            duration: item.duration,
            // Testing Predictor logic
            cutoffs: {
              create: [
                {
                  examName: item.exam,
                  closingRank: item.closingRank,
                  category: "General",
                  year: 2025
                },
                {
                  examName: item.exam,
                  closingRank: Math.floor(item.closingRank * 1.5),
                  category: "OBC",
                  year: 2025
                }
              ]
            },
            // Testing Compare logic
            placements: {
              create: {
                year: 2025,
                avgPackage: item.avgPackage,
                highestPackage: item.highestPackage
              }
            },
            // Adding a sample review
            reviews: {
              create: {
                rating: Math.floor(item.rating),
                comment: `Great campus life and faculty at ${item.name}!`,
                userId: testUser.id,
              }
            }
          }
        }
      }
    });

    // Automatically save one college for the test user to check saved items route
    if (item.name.includes("IIT")) {
        await prisma.savedItem.create({
            data: {
                userId: testUser.id,
                collegeId: college.id
            }
        });
    }

    console.log(`✅ Created ${college.name}`);
  }

  console.log("\n🚀 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });