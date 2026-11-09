import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
const {SUPERADMIN_NAME,SUPERADMIN_EMAIL,SUPERADMIN_PASSWORD}=process.env;
try{if(!SUPERADMIN_NAME||!SUPERADMIN_EMAIL||!SUPERADMIN_PASSWORD||SUPERADMIN_PASSWORD.length<14)throw new Error('Set SUPERADMIN_NAME, SUPERADMIN_EMAIL, and a SUPERADMIN_PASSWORD with at least 14 characters.');const passwordHash=await bcrypt.hash(SUPERADMIN_PASSWORD,12);const user=await prisma.user.upsert({where:{email:SUPERADMIN_EMAIL.toLowerCase()},create:{name:SUPERADMIN_NAME,email:SUPERADMIN_EMAIL.toLowerCase(),passwordHash,role:'SUPER_ADMIN'},update:{name:SUPERADMIN_NAME,passwordHash,role:'SUPER_ADMIN',status:'ACTIVE'}});console.log(`Director account ready for ${user.email}. No password was printed.`)}catch(e){console.error(e.message);process.exitCode=1}finally{await prisma.$disconnect()}
