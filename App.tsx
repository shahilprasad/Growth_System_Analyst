import React, { useState, useEffect } from 'react';
import { generateMockData } from './services/mockDataService';
import { analyzeGrowthSignals } from './services/geminiService';
import { ClinicianLog, InterventionSignal, AnalysisSummary } from './types';
import { DashboardHeader } from './components/DashboardHeader';
import { RawDataTable } from './components/RawDataTable';
import { SignalCard } from './components/SignalCard';
import { RefreshCw, Play, Database, BrainCircuit, LayoutDashboard } from 'lucide-react';

const MOCK_COUNT = 50;
const HUMAN_MINUTES_PER_USER = 10;

function App() {
  const [logs, setLogs] = useState<ClinicianLog[]>([]);
  const [signals, setSignals] = useState<InterventionSignal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<AnalysisSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'raw' | 'signals'>('raw');

  // Load initial mock data
  useEffect(() => {
    handleRegenerateData();
  }, []);

  const handleRegenerateData = () => {
    const data = generateMockData(MOCK_COUNT);
    setLogs(data);
    setSignals([]);
    setSummary(null);
    setActiveTab('raw');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const startTime = performance.now();

    try {
      const results = await analyzeGrowthSignals(logs);
      
      const endTime = performance.now();
      const processingTimeMs = endTime - startTime;
      const processingTimeSeconds = processingTimeMs / 1000;
      
      // Calculate efficiency
      const humanTimeMinutes = logs.length * HUMAN_MINUTES_PER_USER;
      const humanTimeSeconds = humanTimeMinutes * 60;
      const multiplier = humanTimeSeconds / processingTimeSeconds;

      setSignals(results);
      setSummary({
        totalProcessed: logs.length,
        signalsFound: results.length,
        processingTimeMs,
        humanTimeEquivalentMinutes: humanTimeMinutes,
        speedMultiplier: multiplier
      });
      setActiveTab('signals');
    } catch (error) {
      alert("Failed to run analysis. Check console and API Key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-heidi-green text-white p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-display tracking-tight">Heidi Growth Agent</h1>
                <p className="text-xs text-gray-500">Automated Lifecycle Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleRegenerateData}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heidi-green"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Data
                </button>
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-heidi-green hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heidi-green transition-all ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isAnalyzing ? (
                        <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 mr-2 fill-current" />
                            Run Intelligence
                        </>
                    )}
                </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <DashboardHeader summary={summary} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('raw')}
                        className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                            activeTab === 'raw'
                            ? 'border-heidi-green text-heidi-green'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <Database className="w-4 h-4" />
                        Raw Data Ingestion ({logs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('signals')}
                        disabled={signals.length === 0}
                        className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                            activeTab === 'signals'
                            ? 'border-heidi-green text-heidi-green'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } ${signals.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Generated Signals {signals.length > 0 && `(${signals.length})`}
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="p-6 bg-gray-50 min-h-[500px]">
                {activeTab === 'raw' ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <RawDataTable data={logs} />
                    </div>
                ) : (
                    <div className="space-y-6">
                         {summary && (
                            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800">
                                    <strong>Analysis Complete:</strong> The AI Agent analyzed {summary.totalProcessed} user logs in {(summary.processingTimeMs/1000).toFixed(2)} seconds. 
                                    A human team would have taken approx {summary.humanTimeEquivalentMinutes} minutes.
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {signals.map((signal) => {
                                const userLog = logs.find(l => l.user_id === signal.userId);
                                return (
                                    <SignalCard 
                                        key={signal.userId} 
                                        signal={signal} 
                                        specialty={userLog?.specialty}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;