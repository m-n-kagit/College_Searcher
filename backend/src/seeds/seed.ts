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
  {
    name: "IIT Bombay - Indian Institute of Technology",
    location: "Mumbai, Maharashtra",
    description: "A premier engineering institute known for research and innovation.",
    rating: 4.8,
    courseName: "B.Tech Computer Science and Engineering",
    fees: "8.50 Lacs",
    duration: 4,
    exam: "JEE Advanced",
    closingRank: 67,
    avgPackage: 26.5,
    highestPackage: 110.0
  },
  {
    name: "IIM Ahmedabad - Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    description: "The top-ranked management institute in India.",
    rating: 4.7,
    courseName: "PGP in Management",
    fees: "28.00 Lacs",
    duration: 2,
    exam: "CAT",
    closingRank: 99, // Percentile
    avgPackage: 32.8,
    highestPackage: 75.0
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    description: "Top private institute with a 'No Attendance' policy.",
    rating: 4.5,
    courseName: "B.E. Computer Science",
    fees: "22.00 Lacs",
    duration: 4,
    exam: "BITSAT",
    closingRank: 320,
    avgPackage: 21.0,
    highestPackage: 60.5
  },
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    description: "The top-ranked National Institute of Technology.",
    rating: 4.4,
    courseName: "B.Tech Electronics and Communication",
    fees: "6.50 Lacs",
    duration: 4,
    exam: "JEE Main",
    closingRank: 2500,
    avgPackage: 15.5,
    highestPackage: 42.0
  }
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