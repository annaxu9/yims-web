// Admin.js
import { useState, useEffect } from 'react';
import BracketGeneration from '../components/admin/BracketGeneration';

export default function Admin() {
    return (
        <div className="container mx-auto my-8">
            <BracketGeneration />
        </div>
    );
}
