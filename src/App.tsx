import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AgroStore } from './lib/store';
import { FarmProfile, CropRecord, WeatherForecastBundle, DiseaseDetectionResult, YieldPredictionResult, DatasetItem, ModelZooItem, MLTrainingState, MLTrainingConfig } from './types/agro';
import { SupportedLang, getLanguageName } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { FarmModal } from './components/FarmModal';
import { CropModal } from './components/CropModal';
import { NotificationsModal } from './components/NotificationsModal';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { MobileBottomNav } from './components/MobileBottomNav';

// Views
import { DashboardView } from './components/views/DashboardView';
import { WeatherView } from './components/views/WeatherView';
import { CropPlannerView } from './components/views/CropPlannerView';
import { YieldPredictorView } from './components/views/YieldPredictorView';
import { DiseaseScannerView } from './components/views/DiseaseScannerView';
import { MedicineGuideView } from './components/views/MedicineGuideView';
import { AssistantView } from './components/views/AssistantView';
import { DatasetManagerView } from './components/views/DatasetManagerView';
import { ModelTrainingView } from './components/views/ModelTrainingView';
import { ModelManagementView } from './components/views/ModelManagementView';
import { MapView } from './components/views/MapView';
import { ReportsView } from './components/views/ReportsView';
import { AdminPanel } from './components/views/AdminPanel';

export function App() {
  const [farms, setFarms] = useState<FarmProfile[]>(() => AgroStore.getFarms());
  const [activeFarm, setActiveFarm] = useState<FarmProfile>(() => AgroStore.getActiveFarm());
  const [crops, setCrops] = useState<CropRecord[]>(() => AgroStore.getCrops());
  const [scans, setScans] = useState<DiseaseDetectionResult[]>(() => AgroStore.getDiseaseScans());
  const [yields, setYields] = useState<YieldPredictionResult[]>(() => AgroStore.getYieldPredictions());
  const [datasets, setDatasets] = useState<DatasetItem[]>(() => AgroStore.getDatasets());
  const [models, setModels] = useState<ModelZooItem[]>(() => AgroStore.getModels());
  const [lang, setLang] = useState<SupportedLang>(() => AgroStore.getLanguage());

  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam) return viewParam;
    }
    return 'dashboard';
  });
  const [weather, setWeather] = useState<WeatherForecastBundle | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Modals
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ML Training Engine State
  const [trainingState, setTrainingState] = useState<MLTrainingState>({
    status: 'idle',
    currentEpoch: 0,
    totalEpochs: 25,
    progressPct: 0,
    trainLoss: 0.842,
    trainAccuracy: 0.68,
  });
  const trainingIntervalRef = useRef<any>(null);

  // Load weather when active farm changes
  useEffect(() => {
    fetchWeather();
  }, [activeFarm.id, activeFarm.lat, activeFarm.lng, lang]);

  async function fetchWeather() {
    setWeatherLoading(true);
    try {
      const res = await fetch(`/api/weather?lat=${activeFarm.lat}&lon=${activeFarm.lng}&place=${encodeURIComponent(activeFarm.locationName)}&lang=${getLanguageName(lang)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
    } finally {
      setWeatherLoading(false);
    }
  }

  function handleSelectFarm(farm: FarmProfile) {
    setActiveFarm(farm);
    AgroStore.setActiveFarmId(farm.id);
  }

  function handleSaveFarm(newFarm: FarmProfile) {
    const updated = [newFarm, ...farms];
    setFarms(updated);
    AgroStore.saveFarms(updated);
    handleSelectFarm(newFarm);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  }

  function handleSaveCrop(newCrop: CropRecord) {
    AgroStore.saveCrop(newCrop);
    setCrops(AgroStore.getCrops());
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  }

  function handleAddScan(scan: DiseaseDetectionResult) {
    AgroStore.addDiseaseScan(scan);
    setScans(AgroStore.getDiseaseScans());
  }

  function handleAddYield(yieldResult: YieldPredictionResult) {
    AgroStore.addYieldPrediction(yieldResult);
    setYields(AgroStore.getYieldPredictions());
  }

  function handleAddDataset(ds: DatasetItem) {
    AgroStore.addDataset(ds);
    setDatasets(AgroStore.getDatasets());
  }

  function handleDeleteDataset(id: string) {
    AgroStore.deleteDataset(id);
    setDatasets(AgroStore.getDatasets());
  }

  function handleSaveModelToZoo(model: ModelZooItem) {
    AgroStore.addModel(model);
    setModels(AgroStore.getModels());
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
  }

  function handleChangeLang(newLang: SupportedLang) {
    setLang(newLang);
    AgroStore.setLanguage(newLang);
  }

  // Simulated Live ML Training Loop
  function handleStartTraining(config: MLTrainingConfig) {
    if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);

    const total = config.epochs || 25;
    let epoch = 0;
    let loss = 0.85;
    let acc = 0.65;

    setTrainingState({
      status: 'running',
      currentEpoch: 0,
      totalEpochs: total,
      progressPct: 0,
      trainLoss: loss,
      trainAccuracy: acc,
    });

    trainingIntervalRef.current = setInterval(() => {
      epoch += 1;
      loss = Math.max(0.012, loss - (loss * 0.12) + (Math.random() * 0.02 - 0.01));
      acc = Math.min(0.985, acc + (0.014 * (1 - acc)) + (Math.random() * 0.005));
      const pct = Math.round((epoch / total) * 100);

      setTrainingState({
        status: epoch >= total ? 'completed' : 'running',
        currentEpoch: epoch,
        totalEpochs: total,
        progressPct: pct,
        trainLoss: parseFloat(loss.toFixed(4)),
        trainAccuracy: parseFloat(acc.toFixed(3)),
      });

      if (epoch >= total) {
        clearInterval(trainingIntervalRef.current);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      }
    }, 450);
  }

  function handleStopTraining() {
    if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);
    setTrainingState(prev => ({ ...prev, status: 'paused' }));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <Navbar
        farms={farms}
        activeFarm={activeFarm}
        onSelectFarm={handleSelectFarm}
        onOpenAddFarm={() => setIsAddFarmOpen(true)}
        lang={lang}
        onChangeLang={handleChangeLang}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        alertCount={weather?.alerts?.length || 2}
        currentTemp={weather?.current?.temp}
        currentWeatherDesc={weather?.current?.weatherDescription}
        onNavigate={setCurrentView}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Left Navigation Sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar
            currentView={currentView}
            onSelectView={setCurrentView}
            lang={lang}
            trainingRunning={trainingState.status === 'running'}
          />
        </div>

        {/* Mobile Slide-Out Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            {/* Drawer */}
            <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-300">
              <Sidebar
                currentView={currentView}
                onSelectView={setCurrentView}
                lang={lang}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
                trainingRunning={trainingState.status === 'running'}
              />
            </div>
          </div>
        )}

        {/* Center Main View Canvas */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {currentView === 'dashboard' && (
            <DashboardView
              activeFarm={activeFarm}
              crops={crops}
              weather={weather}
              scans={scans}
              yields={yields}
              trainingState={trainingState}
              lang={lang}
              onNavigate={setCurrentView}
              onOpenAddCrop={() => setIsAddCropOpen(true)}
            />
          )}

          {currentView === 'weather' && (
            <WeatherView
              activeFarm={activeFarm}
              weather={weather}
              isLoading={weatherLoading}
              onRefresh={fetchWeather}
              lang={lang}
            />
          )}

          {currentView === 'cropplanner' && (
            <CropPlannerView
              activeFarm={activeFarm}
              crops={crops}
              onOpenAddCrop={() => setIsAddCropOpen(true)}
              lang={lang}
            />
          )}

          {currentView === 'yieldpredictor' && (
            <YieldPredictorView
              activeFarm={activeFarm}
              crops={crops}
              yields={yields}
              onAddYield={handleAddYield}
              lang={lang}
            />
          )}

          {currentView === 'diseasescanner' && (
            <DiseaseScannerView
              onAddScan={handleAddScan}
              scans={scans}
              lang={lang}
            />
          )}

          {currentView === 'medicineguide' && (
            <MedicineGuideView
              activeFarm={activeFarm}
              lang={lang}
            />
          )}

          {currentView === 'assistant' && (
            <AssistantView
              activeFarm={activeFarm}
              lang={lang}
            />
          )}

          {currentView === 'datasetmanager' && (
            <DatasetManagerView
              datasets={datasets}
              onAddDataset={handleAddDataset}
              onDeleteDataset={handleDeleteDataset}
              lang={lang}
            />
          )}

          {currentView === 'modeltraining' && (
            <ModelTrainingView
              trainingState={trainingState}
              onStartTraining={handleStartTraining}
              onStopTraining={handleStopTraining}
              onSaveModelToZoo={handleSaveModelToZoo}
              lang={lang}
            />
          )}

          {currentView === 'modelzoo' && (
            <ModelManagementView
              models={models}
              lang={lang}
            />
          )}

          {currentView === 'map' && (
            <MapView
              activeFarm={activeFarm}
              farms={farms}
              onSelectFarm={handleSelectFarm}
              lang={lang}
            />
          )}

          {currentView === 'reports' && (
            <ReportsView
              activeFarm={activeFarm}
              crops={crops}
              weather={weather}
              scans={scans}
              yields={yields}
              lang={lang}
            />
          )}

          {currentView === 'admin' && (
            <AdminPanel
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <FarmModal
        isOpen={isAddFarmOpen}
        onClose={() => setIsAddFarmOpen(false)}
        onSaveFarm={handleSaveFarm}
        lang={lang}
      />

      <CropModal
        isOpen={isAddCropOpen}
        onClose={() => setIsAddCropOpen(false)}
        onSaveCrop={handleSaveCrop}
        activeFarm={activeFarm}
        lang={lang}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        alerts={weather?.alerts || []}
        lang={lang}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        lang={lang}
      />

      {/* PWA Offline & Install Manager */}
      <PwaInstallPrompt lang={lang} />
    </div>
  );
}

export default App;
