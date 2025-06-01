require('dotenv').config();

module.exports = function generateEmailMessage(studentData, subjects) {
    const { Student_Name, Parent_Email } = studentData;
    const passingScore = 40;

    // Dynamically generate scores object based on subjects provided
    const scores = subjects.reduce((acc, subject) => {
        acc[subject] = studentData[subject];
        return acc;
    }, {});

    // Calculate total score and percentage (assuming each subject is out of 100)
    const totalScore = Object.keys(scores)
        .filter(key => key.endsWith('_Score')) // Only include subjects ending with '_Score'
        .reduce((sum, key) => sum + Number(scores[key]), 0); // Convert values to numbers before adding

    const percentage = (totalScore / (subjects.length * 100)) * 100;

    // Calculate pass/fail status
    const status = Object.values(scores).every(score => score >= passingScore) ? 'PASS' : 'FAIL';
    const resultMessage = status === 'PASS' ? 'successful' : 'unsuccessful';

    // Construct the dynamic message
    let scoreDetails = subjects.map(subject => `- 📖 ${subject.replace('_Score', '')}: ${scores[subject]}`).join('\n');
    
    // Conditionally include percentage if the status is 'PASS'
    const percentageText = status === 'PASS' ? `📊 Percentage: ${percentage.toFixed(2)}%` : '';

    const message = `Dear Parent,

We are pleased to share the recent test results for ${Student_Name}:

${scoreDetails}

✅ Final Status: ${status}
${percentageText}
🎯 The result is ${resultMessage}.

Thank you for your continued support in ${Student_Name}'s academic journey.

Best regards,
School Administration`;

    console.log(message);

    return {
        email: Parent_Email,
        subject: `${Student_Name}'s Test Results`,
        message: message
    };
}
