import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool, { initDatabase } from '@/lib/db';
import { createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await initDatabase();
    
    const body = await request.json();
    const { username, password, kodnestid, email, mobile, name } = body;

    // Validation
    if (!username || !password || !kodnestid || !email || !mobile || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ? OR kodnestid = ?',
      [username, email, kodnestid]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Username, email, or KodNest ID already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO users (username, password, kodnestid, email, mobile, name) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, kodnestid, email, mobile, name]
    );

    const insertResult = result as any;
    const userId = insertResult.insertId;

    // Create token and set cookie
    const token = await createToken(userId, username);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: { id: userId, username, name }
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
