import React, { useState, useEffect } from 'react';

const onboardingSteps = [
    {
        id: 'welcome',
        title: 'Welcome to Xeno! 🚀',
        content: 'Let\'s get your account set up for success. This quick tour will help you launch your first campaign in minutes.',
        action: 'Start Tour',
        image: '👋'
    },
    {
        id: 'connect',
        title: 'Connect Channels',
        content: 'Link your WhatsApp, Email, or SMS accounts to reach customers where they are.',
        action: 'Connect Now',
        image: '🔗'
    },
    {
        id: 'import',
        title: 'Import Customers',
        content: 'Upload your customer list or connect your Shopify/POS to sync data automatically.',
        action: 'Import Data',
        image: '👥'
    },
    {
        id: 'campaign',
        title: 'Create First Campaign',
        content: 'Use our AI-powered builder to launch a high-converting campaign.',
        action: 'Create Campaign',
        image: '✨'
    },
    {
        id: 'complete',
        title: 'You\'re All Set! 🎉',
        content: 'You\'ve unlocked the "Fast Starter" badge! Explore your dashboard to see real-time insights.',
        action: 'Go to Dashboard',
        image: '🏆'
    }
];

function OnboardingWizard({ showToast, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Simulate checking if onboarding is needed
    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('xeno_onboarding_seen');
        if (hasSeenOnboarding) {
            setIsVisible(false);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            showToast(`Step ${currentStep + 1} completed!`, 'success');
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('xeno_onboarding_seen', 'true');
        showToast('Onboarding completed! "Fast Starter" badge unlocked 🏆', 'success');
        if (onClose) onClose();
    };

    const handleSkip = () => {
        setIsVisible(false);
        localStorage.setItem('xeno_onboarding_seen', 'true');
        showToast('Onboarding skipped. You can restart it from Settings.', 'info');
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    const step = onboardingSteps[currentStep];
    const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="card" style={{
                width: '90%',
                maxWidth: '500px',
                textAlign: 'center',
                padding: 'var(--spacing-2xl)',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <button
                    onClick={handleSkip}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    Skip Tour
                </button>

                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>
                    {step.image}
                </div>

                <h2 className="text-2xl font-bold" style={{ marginBottom: 'var(--spacing-md)' }}>
                    {step.title}
                </h2>

                <p className="text-secondary" style={{ marginBottom: 'var(--spacing-2xl)', lineHeight: '1.6' }}>
                    {step.content}
                </p>

                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: 'var(--spacing-xl)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--color-primary)',
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>

                <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    onClick={handleNext}
                >
                    {step.action}
                </button>

                <div style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Step {currentStep + 1} of {onboardingSteps.length}
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default OnboardingWizard;
