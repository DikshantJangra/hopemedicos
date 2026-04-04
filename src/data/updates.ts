import type { Update } from "@/types/updates";

/**
 * Community Updates Data
 * 
 * This file contains all updates/posts for Hope Medicos.
 * In production, this would be replaced with a CMS or database.
 * 
 * Categories:
 * - celebration: Community celebrations, events, milestones
 * - health-tip: Health advice, wellness tips, medical information
 * - announcement: Store announcements, new services, policy changes
 * - community: Community initiatives, success stories, testimonials
 * - awareness: Health awareness campaigns, educational content
 */

export const updates: Update[] = [
    {
        id: '1',
        title: 'World Health Day Celebration 2026',
        excerpt: 'Join us as we celebrate World Health Day with free health check-ups and wellness workshops for the community.',
        content: `
            <p>This World Health Day, Hope Medicos is proud to organize a full day of free health services and wellness activities for our community.</p>
            
            <h3>Event Highlights:</h3>
            <ul>
                <li>Free health check-ups including blood pressure, blood sugar, and BMI measurements</li>
                <li>Consultations with experienced doctors and healthcare professionals</li>
                <li>Interactive wellness workshops on nutrition, exercise, and mental health</li>
                <li>Free distribution of health awareness materials and vitamins</li>
                <li>Special discounts on medicines throughout the day</li>
            </ul>

            <h3>Event Details:</h3>
            <p><strong>Date:</strong> April 7, 2026<br>
            <strong>Time:</strong> 9:00 AM - 5:00 PM<br>
            <strong>Location:</strong> Hope Medicos, Main Branch</p>

            <p>We believe that health is a fundamental right, and World Health Day is the perfect opportunity to give back to our community. Our team of dedicated healthcare professionals will be available throughout the day to answer your questions and provide guidance.</p>

            <p>No registration required - just walk in! Bring your family and friends. Let's celebrate health together!</p>

            <p><em>For more information, contact us at +91 98120 80390</em></p>
        `,
        category: 'celebration',
        author: 'Hope Medicos Team',
        date: '2026-04-07',
        imageUrl: '/hopemedicosshopgraphic.svg',
        featured: true,
        tags: ['community', 'health', 'celebration', 'free-checkup']
    },
    {
        id: '2',
        title: '5 Essential Tips for Managing Diabetes',
        excerpt: 'Learn practical strategies to maintain healthy blood sugar levels and improve your quality of life.',
        content: `
            <p>Managing diabetes effectively requires a combination of lifestyle changes, medication adherence, and regular monitoring. Here are five essential tips to help you maintain healthy blood sugar levels.</p>

            <h3>1. Monitor Your Blood Sugar Regularly</h3>
            <p>Regular monitoring helps you understand how food, activity, and medication affect your blood sugar levels. Keep a log and share it with your healthcare provider.</p>

            <h3>2. Follow a Balanced Diet</h3>
            <p>Focus on whole grains, lean proteins, healthy fats, and plenty of vegetables. Limit refined carbohydrates and sugary foods. Consider consulting a dietitian for a personalized meal plan.</p>

            <h3>3. Stay Physically Active</h3>
            <p>Aim for at least 30 minutes of moderate exercise most days of the week. Walking, swimming, or cycling can help improve insulin sensitivity and blood sugar control.</p>

            <h3>4. Take Medications as Prescribed</h3>
            <p>Never skip or adjust your diabetes medications without consulting your doctor. Set reminders if needed to ensure you take them at the right time.</p>

            <h3>5. Manage Stress and Get Adequate Sleep</h3>
            <p>Stress and poor sleep can affect blood sugar levels. Practice relaxation techniques and aim for 7-8 hours of quality sleep each night.</p>

            <p><strong>Remember:</strong> Diabetes management is a journey, not a destination. Small, consistent changes can make a big difference in your health outcomes.</p>

            <p><em>Visit Hope Medicos for diabetes management supplies and expert consultation.</em></p>
        `,
        category: 'health-tip',
        author: 'Dr. Sharma',
        date: '2026-03-28',
        featured: true,
        tags: ['diabetes', 'health-tips', 'wellness', 'lifestyle']
    },
    {
        id: '3',
        title: 'New Extended Hours Starting April',
        excerpt: 'We are now open until 10 PM on weekdays to serve you better. Your health, our priority.',
        content: `
            <p>We are excited to announce that Hope Medicos will be extending our operating hours to better serve our community's healthcare needs.</p>

            <h3>New Operating Hours:</h3>
            <ul>
                <li><strong>Monday - Friday:</strong> 8:00 AM - 10:00 PM</li>
                <li><strong>Saturday:</strong> 8:00 AM - 9:00 PM</li>
                <li><strong>Sunday:</strong> 9:00 AM - 8:00 PM</li>
            </ul>

            <h3>Why We're Extending Our Hours:</h3>
            <p>We understand that healthcare needs don't follow a 9-to-5 schedule. Many of our customers work long hours and find it challenging to visit during traditional pharmacy hours. Our extended hours mean:</p>

            <ul>
                <li>More convenient access to medications and healthcare products</li>
                <li>Pharmacist consultations available later in the evening</li>
                <li>Emergency medication needs can be addressed promptly</li>
                <li>Less waiting time during peak hours</li>
            </ul>

            <h3>Services Available During Extended Hours:</h3>
            <p>All our regular services will be available during the extended hours, including prescription filling, over-the-counter medications, health consultations, and medical supplies.</p>

            <p>Our commitment to your health and well-being drives everything we do. These extended hours are just one more way we're working to make healthcare more accessible for everyone in our community.</p>

            <p><em>Questions? Call us at +91 98120 80390</em></p>
        `,
        category: 'announcement',
        author: 'Hope Medicos',
        date: '2026-03-25',
        featured: true,
        tags: ['announcement', 'service', 'hours', 'convenience']
    },
    {
        id: '4',
        title: 'Understanding Blood Pressure: A Complete Guide',
        excerpt: 'Everything you need to know about monitoring and maintaining healthy blood pressure levels.',
        content: `
            <p>Blood pressure is one of the most important indicators of cardiovascular health. Understanding what your numbers mean and how to maintain healthy levels can significantly reduce your risk of heart disease and stroke.</p>

            <h3>What Do the Numbers Mean?</h3>
            <p>Blood pressure is measured in two numbers:</p>
            <ul>
                <li><strong>Systolic (top number):</strong> Pressure when your heart beats</li>
                <li><strong>Diastolic (bottom number):</strong> Pressure when your heart rests between beats</li>
            </ul>

            <h3>Healthy Blood Pressure Ranges:</h3>
            <ul>
                <li>Normal: Less than 120/80 mmHg</li>
                <li>Elevated: 120-129/less than 80 mmHg</li>
                <li>High Blood Pressure (Stage 1): 130-139/80-89 mmHg</li>
                <li>High Blood Pressure (Stage 2): 140/90 mmHg or higher</li>
            </ul>

            <h3>Tips for Maintaining Healthy Blood Pressure:</h3>
            <ul>
                <li>Reduce sodium intake to less than 2,300 mg per day</li>
                <li>Exercise regularly - at least 150 minutes per week</li>
                <li>Maintain a healthy weight</li>
                <li>Limit alcohol consumption</li>
                <li>Manage stress through meditation or yoga</li>
                <li>Get adequate sleep (7-9 hours per night)</li>
            </ul>

            <p><strong>Important:</strong> Regular monitoring is key. Visit Hope Medicos for free blood pressure checks and expert advice on managing your cardiovascular health.</p>

            <p><em>Consult with our pharmacists for blood pressure monitoring devices and medications.</em></p>
        `,
        category: 'health-tip',
        author: 'Dr. Patel',
        date: '2026-03-20',
        tags: ['blood-pressure', 'cardiovascular', 'health-tips', 'prevention']
    },
    {
        id: '5',
        title: 'Community Health Camp Success',
        excerpt: 'Over 200 families benefited from our recent health camp. Thank you for your overwhelming support!',
        content: `
            <p>We are thrilled to share the success of our recent Community Health Camp held on March 10, 2026. The event exceeded all our expectations, with over 200 families from our community participating.</p>

            <h3>By the Numbers:</h3>
            <ul>
                <li>200+ families served</li>
                <li>500+ free health screenings conducted</li>
                <li>50+ doctor consultations provided</li>
                <li>300+ health awareness kits distributed</li>
                <li>15 healthcare professionals volunteered</li>
            </ul>

            <h3>Services Provided:</h3>
            <p>Our dedicated team of healthcare professionals provided comprehensive health screenings including blood pressure checks, blood sugar testing, BMI calculations, and general health consultations. We also conducted awareness sessions on nutrition, hygiene, and preventive healthcare.</p>

            <h3>Community Impact:</h3>
            <p>Several participants discovered health conditions that required attention, and we were able to connect them with appropriate medical care. Many families expressed gratitude for the accessible healthcare services and valuable health information they received.</p>

            <h3>Thank You:</h3>
            <p>This event would not have been possible without the support of our community, volunteer healthcare professionals, and local organizations. Your participation and enthusiasm inspire us to continue organizing such initiatives.</p>

            <p><strong>Looking Ahead:</strong> Based on the overwhelming response, we are planning our next health camp for June 2026. Stay tuned for more details!</p>

            <p><em>Want to volunteer or support our next health camp? Contact us at +91 98120 80390</em></p>
        `,
        category: 'community',
        author: 'Hope Medicos Team',
        date: '2026-03-15',
        imageUrl: '/hopemedicosshopgraphic.svg',
        tags: ['community', 'health-camp', 'success-story', 'volunteer']
    },
    {
        id: '6',
        title: 'New Medicines Now Available',
        excerpt: 'We have expanded our inventory with the latest medications. Check availability with our team.',
        content: `
            <p>Hope Medicos is pleased to announce the expansion of our medicine inventory with several new and essential medications now available for our customers.</p>

            <h3>Newly Added Categories:</h3>
            <ul>
                <li>Advanced diabetes management medications</li>
                <li>Latest cardiovascular drugs</li>
                <li>Specialized pain management options</li>
                <li>New respiratory care medications</li>
                <li>Enhanced vitamin and supplement range</li>
            </ul>

            <h3>Why This Matters:</h3>
            <p>We continuously update our inventory to ensure you have access to the most effective and up-to-date treatment options. Our expanded selection means you can find everything you need in one trusted location.</p>

            <h3>Expert Guidance Available:</h3>
            <p>Our experienced pharmacists are available to answer your questions about new medications, potential interactions, proper usage, and side effects. We believe informed patients make better health decisions.</p>

            <h3>Competitive Pricing:</h3>
            <p>As always, we maintain competitive pricing on all medications, including our new additions. We also offer generic alternatives where available to help you save on healthcare costs.</p>

            <p><strong>How to Check Availability:</strong> Call us at +91 98120 80390 or visit our store. Our team will be happy to check stock and reserve medications for you.</p>

            <p><em>Prescription required for certain medications. Bring your prescription or consult with our pharmacist.</em></p>
        `,
        category: 'announcement',
        author: 'Hope Medicos',
        date: '2026-03-10',
        tags: ['announcement', 'medicines', 'inventory', 'healthcare']
    },
];

// Helper function to get featured updates
export const getFeaturedUpdates = (): Update[] => {
    return updates.filter(update => update.featured).slice(0, 3);
};

// Helper function to get update by ID
export const getUpdateById = (id: string): Update | null => {
    return updates.find(update => update.id === id) || null;
};

// Helper function to get updates by category
export const getUpdatesByCategory = (category: Update['category']): Update[] => {
    return updates.filter(update => update.category === category);
};

// Helper function to get all updates sorted by date
export const getAllUpdates = (): Update[] => {
    return [...updates].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};
