"use client";
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import AboutUs from './components/AboutManifesto';
import CoreObjectives from './components/CoreObjectives';
import DetailedServices from './components/DetailedServices';
import Workflow from './components/Workflow';

import Articles from './components/Articles';
import FinalCTA from './components/FinalCTA';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { Section } from './components/ThemeSystem';

export default function Home() {
    return (
        <main className="min-h-screen selection:bg-crimson-rich selection:text-white">
            <LoadingScreen />
            <CustomCursor />

            <Navigation />

            <div id="home">
                <Hero />
            </div>

            <Section index={2} id="about">
                <AboutUs />
            </Section>

            <Section index={3} id="objectives">
                <CoreObjectives />
            </Section>

            <Section index={4} id="services">
                <DetailedServices />
            </Section>

            <Section index={5} id="workflow">
                <Workflow />
            </Section>



            <Section index={6} id="team">
                <TeamSection />
            </Section>

            <Section index={7} id="insights">
                <Articles />
            </Section>

            <FinalCTA />



            <Footer />
        </main>
    );
}
