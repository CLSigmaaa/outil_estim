
import { describe, expect, test } from '@jest/globals';
import { BurnCharts, Ensemble_Data, Projet, Sprint, prorityStats, stateStats } from '@/app/model/projet';
import { mockProject } from './data';
import { differenceInDays } from "date-fns"
import { nativeStateEnum, nativePriorityEnum } from '@/app/model/projet/itemEnum';
import { useTreeStore } from '@/components/store/useTreeStore';
import { act, renderHook } from '@testing-library/react';


describe('Stats', () => {
    var { result } = renderHook(() => useTreeStore())
    const projet: Projet = mockProject;
    const totalPoints: number = 285; // A modifier manuellement
    const consumedPoints: number = 95; // A modifier manuellement
    const sprint: Sprint = projet.children[0] as Sprint;
    test("Génération de l'axe X", () => {
        act(() => expect(Object.keys(result.current.getTimeData(sprint)).length).toBe(differenceInDays(sprint.datesEffectives.to, sprint.datesEffectives.from) + 2)); // Nombre d'élément entre 0 et n: n+1. Et +1 jour de marge
    })

    test("Génération de l'axe Y", () => {
        act(() => expect(expect(Object.values(
            result.current.getPointData(result.current.getTimeData(sprint), sprint) as number[]
        ).reduce((acc, pointEstim) => acc + pointEstim, 0)).toBe(consumedPoints)))
    })
    
    test("Génération du burn down / burn up", () => { 
        var burnCharts: BurnCharts;
        act(() => burnCharts =
            result.current.getBurnUpAndDown(
            result.current.getPointData(result.current.getTimeData(sprint), sprint), totalPoints
        ));
        if (!burnCharts){
            expect(burnCharts).not.toBeUndefined();
            return;
        }
        debugger;
        expect(burnCharts.down[0].pointsRestants).toBe(totalPoints);
        expect(burnCharts.down[burnCharts.down.length - 1].pointsRestants).toBe(totalPoints - consumedPoints);
        expect(burnCharts.up[burnCharts.up.length - 1].pointsRestants).toBe(consumedPoints);
        expect(burnCharts.up[0].pointsRestants).toBe(0);
    })
    
    test("Statistique des éléments du Sprint", () => {
        
        var stats: Ensemble_Data;
        act(() => stats = result.current.getSprintStats(sprint)); 
        if (!stats){
            expect(stats).not.toBeUndefined();
            return;
        }
        expect(stats.totalPoints).toBe(totalPoints);
        expect(stats.stateStats[nativeStateEnum.A_Faire]).toBe(4);
        expect(stats.stateStats[nativeStateEnum.En_Cours]).toBe(5);
        expect(stats.stateStats[nativeStateEnum.Terminee]).toBe(3);
        expect(stats.prorityStats[nativePriorityEnum.Mineure]).toBe(3);
        expect(stats.prorityStats[nativePriorityEnum.Majeure]).toBe(5);
        expect(stats.prorityStats[nativePriorityEnum.Critique]).toBe(4);
    })
    
    
    
});


